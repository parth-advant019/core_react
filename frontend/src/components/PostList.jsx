import { useContext } from "react";
import Post from "./post";
import classes from "./PostsList.module.css";
import PostContext from "../store/PostContext";

function PostsList() {
  const { posts, isLoading, error } = useContext(PostContext);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
      )}

      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet</h2>
          <h2>Start adding some!</h2>
        </div>
      )}
    </>
  );
}

export default PostsList;
