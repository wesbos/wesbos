import { FetcherService, EResourceType, ITweetDetailsResponse } from 'rettiwt-api';

const fetcher = new FetcherService({ apiKey: process.env.TWITTER_API_KEY });

export async function fetchTweetDetails(tweetId: string) {
  console.log('Checking the DB first');
  // const result = await fetchTweetDetailsFromApi(tweetId);
}

export async function fetchTweetDetailsFromApi(tweetId: string) {
  // Fetching the details of the given user
  const postDetails = await fetcher
    .request<ITweetDetailsResponse>(EResourceType.TWEET_DETAILS, { id: tweetId })
    .catch((err) => {
      console.dir(err, { depth: null });
    });
  const result = postDetails?.data?.tweetResult?.result;
  if (!result) {
    console.log(`No tweet details found for ${tweetId}`);
    return; // nothing to return
  }
  // Otherwise we slim it up to the essentials
  const { views, legacy  } = result;
  return {
    views,
    ...legacy,
  };
}
