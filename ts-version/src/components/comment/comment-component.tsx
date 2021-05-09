import React, { useContext, useEffect, useState } from 'react';
import './comment-component.scss';

import { CommentModel } from '../../shared/model/comment-model';
import { Utils } from '../../shared/util/utils';
import { ApiService } from '../../shared/service/api-service';
import RelativeTimeComponent from '../relative-time/relative-time-component';
import LabelIconComponent from '../label-icon/label-icon-component';
import MarkupParserComponent from '../markup-parser-component/markup-parser-component';
import ApiContext from '../../shared/context/api-context';

export function CommentComponent(props: {
  comment: CommentModel;
  className?: string;
  type?: 'comment' | 'reply';
}) {
  const { comment, className, type } = props;
  const [commentReplies, setReplyComments] = useState<CommentModel[]>([]);
  const api: ApiService = useContext(ApiContext);

  useEffect(() => {
    getChildComments(comment, api).then((unfilteredComments: CommentModel[]) => {
      setReplyComments(unfilteredComments.filter(Utils.invalidComments));
    });
  }, [api, comment]);

  return (
    <div className={`comment-wrapper ${className ? className : ''} ${type}`}>
      {/*Comment Meta*/}
      <div className={'header'}>
        <div className={'user-info-wrapper'}>
          <LabelIconComponent
            className="user-id"
            label={comment.by}
            iconClass={type === 'comment' ? 'fa-comment' : 'fa-comments'}
          />
          <RelativeTimeComponent time={comment.time} />
        </div>
        {commentReplies.length ? (
          <span className={'reply-count'}>
            {commentReplies.length} {commentReplies.length > 1 ? 'Replies' : 'Reply'}
          </span>
        ) : (
          ''
        )}
      </div>

      {/*Comment Body*/}
      <MarkupParserComponent key={comment.id} className="comment" text={comment.text} />

      {/*Reply-Comments*/}
      {Utils.hasComments(comment)
        ? commentReplies
            .filter(Utils.invalidComments)
            .slice(0, 3)
            .map((replyComment: CommentModel) => (
              <CommentComponent type="reply" key={replyComment.id} comment={replyComment} />
            ))
        : null}
    </div>
  );
}

async function getChildComments(comment: CommentModel, api: ApiService): Promise<CommentModel[]> {
  if (comment.deleted || !comment.kids || !comment.kids.length) {
    return [];
  }

  return await api.getStoryComments(comment.kids);
}
