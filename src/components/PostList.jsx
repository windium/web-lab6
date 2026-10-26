import Post from './Post.jsx';

// Pure render component: receives posts as props and renders one Post per item.
function PostList({ posts }) {
  return (
    <section className="post-list">
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </section>
  );
}

export default PostList;
