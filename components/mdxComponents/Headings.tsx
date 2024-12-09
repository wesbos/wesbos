import { heading } from '@/styles/MDXStyles.module.css';
import clsx from 'clsx';

/* eslint-disable react/destructuring-assignment */
type HeadingLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';;
export default function H(props: { looksLike?: HeadingLevels; className?: string; as?: HeadingLevels; children: React.ReactNode }) {
  const { looksLike, className, as, ...forwardedProps } = props;
  const Tag = as || 'h1';
  return (
    <Tag {...forwardedProps} className={clsx(heading, className, looksLike || as || '')}>
      <span className="grit">{props.children}</span>
    </Tag>
  );
}
