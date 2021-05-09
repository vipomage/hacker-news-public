import React, { useCallback, useContext, useRef, useState } from 'react';
import './story-component.scss';

import { CommentComponent } from '../../comment/comment-component';
import { StoryModel } from '../../../shared/model/story-model';
import { ApiService } from '../../../shared/service/api-service';
import { CommentModel } from '../../../shared/model/comment-model';
import { Utils } from '../../../shared/util/utils';
import RelativeTimeComponent from '../../relative-time/relative-time-component';
import LabelIconComponent from '../../label-icon/label-icon-component';
import ApiContext from '../../../shared/context/api-context';

export default function StoryComponent(props: { story: StoryModel }) {
  const { story } = props;
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [storyExpanded, setExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const isMounted: React.MutableRefObject<boolean> = useRef(true);
  const api: ApiService = useContext(ApiContext);

  const sendRequest = useCallback(async (): Promise<void> => {
    if (isSending) {
      return;
    }

    setIsSending(true);

    setComments(await getComments(story, api));
    setExpanded(true);

    if (isMounted.current) {
      setIsSending(false);
    }
  }, [api, story, isSending]);

  const toggleComments = (): Promise<void> | void => {
    if (!comments.length && story.kids?.length) {
      return sendRequest();
    }

    return setExpanded(!storyExpanded);
  };

  return (
    <div
      className={`story-wrapper ${storyExpanded ? 'expanded' : 'collapsed'} ${isSending ? 'disabled' : ''}`}>
      <h3 className={`header ${isSending ? 'disabled' : ''}`} key={story.id} onClick={toggleComments}>
        {/*Title & Spinner*/}
        <span className={'title'}>
          {story.title}
          <span className={`header-loading-spinner ${isSending ? 'visible' : 'hidden'}`}>
            <i className={'fas fa-spinner fa-spin'} />
          </span>
        </span>

        {/*Comment Count & Expanded/Collapsed icon*/}
        <div className={'comment-details'}>
          <LabelIconComponent
            className="comment-count"
            label={`${Utils.hasComments(story) ? story.kids.length : 0}`}
            iconClass="fa-comment-dots"
          />
          {/*<span className={'comment-count'}></span>*/}
          <span className={'header-icon-wrapper'}>
            <i className={`fas fa-lg ${storyExpanded ? 'fa-minus-circle' : 'fa-plus-circle'}`} />
          </span>
        </div>
      </h3>

      {/*Story Body & Comments*/}
      <div className={`body ${storyExpanded ? 'visible' : 'hidden'}`}>
        <div className="story-meta">
          <LabelIconComponent className="user" label={story.by} iconClass="fa-user" />
          <LabelIconComponent className="score" label={story.score} iconClass="fa-thumbs-up" />
          <RelativeTimeComponent className="timestamp" time={story.time} />

          <a href={story.url} rel="noreferrer" target="_blank">
            <i className="fas fa-external-link-alt" /> Original Story
          </a>
        </div>

        {/*Comments*/}
        {Utils.hasComments(story) ? (
          <div className="comments">
            <h3 className="comments-header">
              Showing Top <strong>3</strong> Comments with their top <strong>3</strong> replies:
            </h3>
            {comments
              .filter(Utils.invalidComments)
              .slice(0, 3)
              .map((comment: CommentModel) => (
                <CommentComponent
                  key={comment.id}
                  className={'original-comment'}
                  type="comment"
                  comment={comment}
                />
              ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

async function getComments(story: StoryModel, api: ApiService): Promise<CommentModel[]> {
  if (!story.kids || !story.kids.length) {
    return [];
  }

  return await api.getStoryComments(story.kids);
}
