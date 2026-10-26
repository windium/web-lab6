# Assignment 6 – Post Dashboard

A small React app (Vite) that loads posts from
[JSONPlaceholder](https://jsonplaceholder.typicode.com/posts), handles the
loading, error and empty states, and filters posts by title.

Built only with functional components, `useState`, `useEffect`, `useReducer`,
controlled inputs, immutable updates, the Fetch API and conditional rendering.
No external data, state or UI libraries.

## Running it

```bash
npm install
npm run dev
```

## File organization

```
assignment6/
├─ src/
│  ├─ api/
│  │  └─ postsApi.js        fetchPosts(): fetch + JSON parsing only, no React
│  ├─ components/
│  │  ├─ Post.jsx           presentational: renders one title + body
│  │  ├─ PostList.jsx       pure render: maps posts to <Post>, keyed by id
│  │  └─ FilterForm.jsx     controlled input for the title filter
│  ├─ reducer/
│  │  └─ postsReducer.js    pure reducer: FETCH_START / FETCH_SUCCESS / FETCH_ERROR
│  ├─ App.jsx               owns state, runs the fetch effect, derives filtered posts
│  └─ main.jsx              entry point
├─ index.html
└─ package.json
```

### How the pieces fit

- **App** holds the async state with `useReducer(postsReducer, initialState)`
  and the filter text with `useState`.
- A `useEffect` with an empty dependency array fetches once on mount. It
  dispatches `FETCH_START`, then `FETCH_SUCCESS` or `FETCH_ERROR`. The async
  logic is wrapped in `try/catch`.
- The effect's cleanup aborts the request with an `AbortController`, so no
  dispatch happens after unmount.
- Filtered posts are **derived during render** from `posts` and the filter
  text. They are never stored in state, and no effect is used for filtering.
- The UI shows exactly one of: `Loading posts...`, an error message,
  `No posts found.`, or the list.

## Challenges

- **`fetch` doesn't reject on HTTP errors.** A 404 or 500 still resolves, so
  `fetchPosts` checks `response.ok` and throws. Otherwise the reducer would
  receive an error body as if it were posts.
- **Effects run twice in development.** `StrictMode` mounts, unmounts and
  remounts components, so the effect fires twice. Aborting the first request
  in the cleanup, and ignoring the resulting `AbortError`, keeps the state
  from being updated by a stale request.
- **Keeping the reducer pure.** It's tempting to fetch inside the reducer. All
  async work stays in the effect, and the reducer only returns new state
  objects built with the spread operator.
- **Derived state vs. stored state.** Storing the filtered list in state would
  need an effect to keep it in sync with `posts` and the filter, which is
  easy to get wrong. Computing it in render keeps a single source of truth.
- **Empty vs. filtered-empty.** The "No posts found." message has to cover
  both the API returning nothing and a filter that matches nothing, so it is
  based on the filtered list.
