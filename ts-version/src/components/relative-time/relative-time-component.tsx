import { Utils } from '../../shared/util/utils';
import './relative-time.component.scss';

import LabelIconComponent from '../label-icon/label-icon-component';

export default function RelativeTimeComponent({ time, className }: { time: number; className?: string }) {
  const [date, hour] = new Date(time * 1000).toISOString().split('T');

  return (
    <LabelIconComponent
      className={`relative-time-component-wrapper ${className ? className : ''}`}
      iconClass="fa-clock"
      label={Utils.relativeTime(time)}>
      <span className="hover-element">{`${date} - ${hour.slice(0, 5)}`}</span>
    </LabelIconComponent>
  );
}
