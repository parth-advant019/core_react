import { createContext, useReducer, useEffect } from "react";
import useHttp from "../hooks/useHttp";

const PostContext = createContext({
  posts: [],
  isLoading: false,
  isPosting: false,
  error: null,
  addPost: (post) => {},
});

function postReducer(state, action) {
  if (action.type === "SET_POSTS") {
    return { ...state, posts: action.posts };
  }

  if (action.type === "ADD_POST") {
    return { ...state, posts: [action.post, ...state.posts] };
  }

  return state;
}

const getConfig = null;
const postConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export function PostContextProvider({ children }) {
  const [postState, dispatchPostAction] = useReducer(postReducer, {
    posts: [],
  });

  const {
    data: loadedPosts,
    isLoading,
    error,
  } = useHttp("http://localhost:8080/posts", getConfig, { posts: [] });

  const { sendRequest, isLoading: isPosting } = useHttp(
    "http://localhost:8080/posts",
    postConfig,
    null,
  );

  useEffect(() => {
    if (loadedPosts?.posts) {
      setPosts(loadedPosts.posts);
    }
  }, [loadedPosts]);

  function setPosts(posts) {
    dispatchPostAction({ type: "SET_POSTS", posts });
  }

  async function addPost(post) {
    const resData = await sendRequest(JSON.stringify(post));

    dispatchPostAction({ type: "ADD_POST", post: resData.post });
  }

  const postContext = {
    posts: postState.posts,
    isLoading,
    isPosting,
    error,
    addPost,
  };

  return (
    <PostContext.Provider value={postContext}>{children}</PostContext.Provider>
  );
}

export default PostContext;
