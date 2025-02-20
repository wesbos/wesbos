import Link from 'next/link';
// import { headers } from 'next/headers';

export default async function NotFound() {
  // const headersList = await headers();
  // const domain = headersList.get('host');
  // const data = await getSiteData(domain);
  return (
    <div>
      {/* <h2>Not Found: {data.name}</h2> */}
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/blog">all posts</Link>
      </p>
    </div>
  );
}
