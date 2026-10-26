import { useEffect, useReducer, useState } from 'react';
import { fetchPosts } from './api/postsApi.js';
import { initialState, postsReducer } from './reducer/postsReducer.js';
import PostList from './components/PostList.jsx';
import FilterForm from './components/FilterForm.jsx';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const { posts, loading, error } = state;
  const [filter, setFilter] = useState('');

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

  // Derived state: computed during render from the source posts, never stored.
  const query = filter.trim().toLowerCase();
  const visiblePosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  return (
    <main>
      <h1>Post Dashboard</h1>
      <FilterForm value={filter} onChange={setFilter} />

      {loading && <p className="status">Loading posts...</p>}

      {!loading && error && (
        <p className="status error" role="alert">
          Could not load posts: {error}
        </p>
      )}

      {!loading && !error && visiblePosts.length === 0 && (
        <p className="status">No posts found.</p>
      )}

      {!loading && !error && visiblePosts.length > 0 && (
        <PostList posts={visiblePosts} />
      )}
    </main>
  );
}

export default App;
