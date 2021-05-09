import './label-icon-component.scss';

export default function LabelIconComponent({
  label,
  iconClass,
  className,
  children,
}: {
  label: string | number;
  iconClass: string;
  className?: string;
  children?: any;
}) {
  return (
    <span className={`label-icon-wrapper ${className ? className : ''}`}>
      <i className={`icon far ${iconClass}`} />
      <p className="label">{label}</p>
      {children ? children : null}
    </span>
  );
}
