import { Utils } from '../../shared/util/utils';

export default function MarkupParserComponent({ text, className }: { text: string; className?: string }) {
  return <div className={className}>{Utils.createMarkup(text)}</div>;
}
