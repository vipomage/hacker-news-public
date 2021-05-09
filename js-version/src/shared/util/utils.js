import moment from 'moment';
import parse from 'html-react-parser';

export class Utils {
  static relativeTime(time, unix = true) {
    return moment(unix ? time * 1000 : time)
      .startOf('hour')
      .fromNow();
  }

  static createMarkup(unsafeHtmlString) {
    if (!unsafeHtmlString) {
      return '';
    }

    return parse(unsafeHtmlString);
  }

  static invalidComments(comment) {
    return comment && !comment.deleted && !comment.dead && !!comment.text;
  }

  static hasComments(item) {
    return !!item.kids && !!item.kids.length;
  }
}
