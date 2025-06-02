import { TipMetaStyles } from '@/styles/TipStyles.module.css';
import formatDistance from 'date-fns/formatDistance';
import { Link } from 'waku';

export default function TipMeta({ tip }) {
  return (
    <div className={TipMetaStyles}>
      <Link to={`/tip/${tip.frontmatter.slug}`} title="View Tip Details">
        <time dateTime={tip.frontmatter.date}>
          {formatDistance(new Date(tip.frontmatter.date), new Date(), {
            addSuffix: true,
          })}
        </time>
      </Link>
    </div>
  );
}
