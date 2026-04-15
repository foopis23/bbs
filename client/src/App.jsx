import "./App.css";
import { PostList } from "./components/list-view/PostList";
import { PostDetail } from "./components/detail-view/PostDetail";
import { useState } from "react";

function App() {
  const [postId, setPostId] = useState(null);

  function onRequestToViewPost(id) {
    setPostId(id);
  }

  return (
    <main className="container">
      <h1>BBS</h1>
      {postId === null ? (
        <PostList onRequestToViewPost={onRequestToViewPost} />
      ) : (
        <PostDetail onGoBack={() => setPostId(null)} postId={postId} />
      )}
    </main>
  );
}

export default App;
