import { Utils } from '../../shared/util/utils';

export default function MarkupParserComponent({ text, className }) {
  return <div className={className}>{Utils.createMarkup(text)}</div>;
}
