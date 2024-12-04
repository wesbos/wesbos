export async function BlueSkyPost() {
  const url = new URL('https://bsky.app/profile/danabra.mov/post/3la62zxt4rs2j');
  const details = url.pathname.split('/').filter(Boolean).reduce((acc, part, index, pathParts) => {
      if (index % 2 === 0 && pathParts[index + 1]) {
        acc[part] = pathParts[index + 1];
      }
      return acc;
    }, {} as Record<'post' | 'profile' | string, string>);
  const endpoint = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread');
  const params = new URLSearchParams();
  params.append('uri', `at://${details.profile}/app.bsky.feed.post/${details.post}`);
  endpoint.search = params.toString();
  const response  = await fetch(endpoint).then((res) => res.json());
  const { post } = response.thread;
  const date = new Date(post.indexedAt);
  return (
    <div>
      <a href={url.toString()}>
        <img style={{ height: 50, aspectRatio: 1 }} src={post.author.avatar} alt={post.author.handle} />
      </a>
      <p>{post.record.text}</p>
      <div className="counts">
        <span className="reply">💬 {post.replyCount}</span>
        <span className="repost">🔁 {post.repostCount}</span>
        <span className="like">💙 {post.likeCount}</span>
      </div>
      <div className="meta">
        <time dateTime={post.indexedAt}>
          {date.toDateString()} at {date.getHours()}:{date.getMinutes()} {date.getHours() > 12 ? 'PM' : 'AM'}
        </time>
      </div>
    </div>
  );
}
