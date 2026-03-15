import classes from "./NewPost.module.css";
import { useState, useContext } from "react";
import PostContext from "../store/PostContext";

function NewPost({ onCancel }) {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");

  const postCtx = useContext(PostContext);

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }

  function authChangeHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };

    await postCtx.addPost(postData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authChangeHandler} />
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>{postCtx.isPosting ? "Sending..." : "Submit"}</button>
      </p>
    </form>
  );
}

export default NewPost;
