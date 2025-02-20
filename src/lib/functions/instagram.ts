const url = `https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables={"id":"519208","first":8}`;

type InstagramPost = {
  biggie: string;
  thumbnail: string;
  url: string;
  caption: string | null;
  id: string;
};

type InstagramResponse = {
  data: {
    user: {
      edge_owner_to_timeline_media: {
        edges: Array<{
          node: {
            id: string;
            shortcode: string;
            thumbnail_src: string;
            thumbnail_resources: Array<{
              src: string;
            }>;
            edge_media_to_caption: {
              edges: Array<{
                node: {
                  text: string;
                };
              }>;
            };
          };
        }>;
      };
    };
  };
};

const cache: {
  lastFetch: number;
  posts: InstagramPost[];
} = {
  lastFetch: 0,
  posts: [],
};

function slimUpPosts(response: InstagramResponse): InstagramPost[] {
  return response.data.user.edge_owner_to_timeline_media.edges.map((edge) => ({
    biggie: edge.node.thumbnail_src,
    thumbnail: edge.node.thumbnail_resources[2].src,
    url: `https://instagram.com/p/${edge.node.shortcode}`,
    caption: edge.node.edge_media_to_caption.edges.length > 0 ? edge.node.edge_media_to_caption.edges[0].node.text : null,
    id: edge.node.id,
  }));
}

export async function getInstagramPosts() {
  return [];
  // first see if we have a cache in 30 mins
  const timeSinceLastFetch = Date.now() - cache.lastFetch;
  if (timeSinceLastFetch <= 1800000) {
    return cache.posts;
  }
  const data = await fetch(url).then((res) => res.json() as Promise<InstagramResponse>);
  const posts = slimUpPosts(data);
  // const posts = data;
  cache.lastFetch = Date.now();
  cache.posts = posts;
  return posts;
}

type HandlerCallback = (error: any, result: { statusCode: number; headers: { [key: string]: string }; body: string }) => void;

exports.handler = async function (
  event: any,
  context: any,
  callback: HandlerCallback
) {
  const posts = await getInstagramPosts();
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  });
};
