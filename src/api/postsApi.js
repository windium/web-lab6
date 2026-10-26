const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetches all posts and returns the parsed JSON.
// `signal` is optional and lets the caller cancel the request.
export async function fetchPosts(signal) {
  const response = await fetch(POSTS_URL, { signal });

  // fetch only rejects on network failure, so HTTP errors must be checked by hand.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
