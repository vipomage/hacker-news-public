import React, { useCallback, useContext, useRef, useState } from 'react';
import './story-component.scss';

import { CommentComponent } from '../../comment/comment-component';
import { Utils } from '../../../shared/util/utils';
import RelativeTimeComponent from '../../relative-time/relative-time-component';
import LabelIconComponent from '../../label-icon/label-icon-component';
import ApiContext from '../../../shared/context/api-context';

export default function StoryComponent(props) {
  const { story } = props;
  const [comments, setComments] = useState([]);
  const [storyExpanded, setExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true);
  const api = useContext(ApiContext);

  const sendRequest = useCallback(async () => {
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

  const toggleComments = () => {
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
              .map((comment) => (
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

async function getComments(story, api) {
  if (!story.kids || !story.kids.length) {
    return [];
  }

  return await api.getStoryComments(story.kids);
}
