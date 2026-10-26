export const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Pure function: no side effects, never mutates `state`, always returns a new object.
export function postsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, posts: action.payload };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
