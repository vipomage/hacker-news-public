import moment from 'moment';
import parse from 'html-react-parser';
import { CommentModel } from '../model/comment-model';
import { StoryModel } from '../model/story-model';

export class Utils {
  static relativeTime(time: number, unix: boolean = true): string {
    return moment(unix ? time * 1000 : time)
      .startOf('hour')
      .fromNow();
  }

  static createMarkup(unsafeHtmlString: string): string | JSX.Element | JSX.Element[] {
    if (!unsafeHtmlString) {
      return '';
    }

    return parse(unsafeHtmlString);
  }

  static invalidComments(comment: CommentModel): boolean {
    return comment && !comment.deleted && !comment.dead && !!comment.text;
  }

  static hasComments(item: StoryModel | CommentModel): boolean {
    return !!item.kids && !!item.kids.length;
  }
}
