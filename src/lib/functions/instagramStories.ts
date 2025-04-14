const url = `https://www.instagram.com/graphql/query/?query_hash=04334405dbdef91f2c4e207b84c204d7&variables={"only_stories":true,"stories_prefetch":true,"stories_video_dash_manifest":false}`;

type StoryPost = {
  media_preview: string;
  display_url: string;
};

const cache: {
  lastFetch: number;
  posts: StoryPost[];
} = {
  lastFetch: 0,
  posts: [],
};

type InstagramResponse = {
  data?: {
    user?: {
      feed_reels_tray?: {
        edge_reels_tray_to_reel?: {
          edges?: Array<{
            node: {
              user: {
                username: string;
              };
              items: Array<{
                media_preview: string;
                display_url: string;
              }>;
            };
          }>;
        };
      };
    };
  };
};

export async function getInstagramStories() {
  // first see if we have a cache in 5 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 300000) {
    return cache.posts;
  }
  const res = await fetch(url, {
    headers: {
      // get this value from your Storage tab in Firefox dev tools, or the application tab in chrome. As far as I can tell it's good for 1 year, but that seems to be updated daily...
      cookie: `sessionid=${process.env.INSTAGRAM_COOKIE}`,
    },
  })
    .then((x) => x.json() as Promise<InstagramResponse>)
    .catch((err) => console.log(err));

  // Filter out stories that aren't mine. This only happens when I don't post a story, then it returns the stories of people I follow
  const wesEdge = res?.data?.user?.feed_reels_tray?.edge_reels_tray_to_reel?.edges
    ?.map((edge) => edge.node)
    .find((edge) => edge.user.username === 'wesbos');

  // no Stories
  if (!wesEdge) return {};

  // Otherwise return the Stories
  const posts = wesEdge.items.map((item) => ({
    media_preview: item.media_preview,
    display_url: item.display_url,
  }));
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return cache.posts;
}

type HandlerCallback = (
  error: any,
  result: { statusCode: number; headers: { [key: string]: string }; body: string },
) => void;

exports.handler = async (event: any, context: any, callback: HandlerCallback) => {
  const res = await getInstagramStories();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(res),
  });
};
