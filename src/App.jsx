import { useEffect, useReducer } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { initialState, postsReducer } from './reducer/postsReducer.js';
import PostList from './components/PostList.jsx';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loading, error } = state;

  // Fetch once on mount. The AbortController cancels the request if the
  // component unmounts first, so we never dispatch into an unmounted component.
  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });
      try {
        const data = await fetchPosts(controller.signal);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        if (err.name === 'AbortError') return;
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    }

    loadPosts();

    return () => controller.abort();
  }, []);

  return (
    <main>
      <h1>Post Dashboard</h1>

      {loading && <p className="status">Loading posts...</p>}

      {!loading && error && (
        <p className="status error" role="alert">
          Could not load posts: {error}
        </p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="status">No posts found.</p>
      )}

      {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
    </main>
  );
}

export default App;
