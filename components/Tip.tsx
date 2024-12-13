import { TipStyles } from '@/styles/TipStyles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import TipMeta from './TipMeta';
import mdxComponents from './mdxComponents';

export async function Tip({ tip }) {
  console.log(tip);
  const Content = tip.default;
  return (
    <div className={TipStyles}>
      {/* <pre>{JSON.stringify(imagePath, null, 2)}</pre> */}
      <Link href={`/tip/${tip.frontmatter.slug}`}>
        {tip.images && tip.images.map((image, idx) => <Image width={500} height={100} src={image} key={`image${idx}`} />)}
        {/* {tip.frontmatter.videos && tip.frontmatter.videos.map((url) => <video src={url} key={url} autoPlay muted loop />)} */}
        {/* TODO IMAGES {tip.frontmatter.images && tip.frontmatter.images.map((image, idx) => <Img image={image} key={`image${idx}`} alt={tip.body} />)} */}
      </Link>
      <div className="tipContent">
        <TipMeta tip={tip} />
        <Content
          components={{
            ...mdxComponents,
          }}
        />
      </div>
    </div>
  );
}
