import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getAllPosts } from "../../services/bbs";
import { PostDate } from "../PostDate";
import { CreatePost } from "./CreatePost";

export function PostList({ onRequestToViewPost }) {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["bbs", "posts"],
    queryFn: getAllPosts,
  });

  const newPostMutation = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bbs", "posts"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  function onViewPostClicked(id) {
    if (onRequestToViewPost) {
      onRequestToViewPost(id);
    }
  }

  function onNewPostSubmitted(data) {
    console.log(data);
    newPostMutation.mutate({
      ...data,
      createdAt: Date.now(),
    });
  }

  if (postsQuery.isLoading) {
    return "Loading...";
  }

  if (postsQuery.isError) {
    return <div className="alert">Failed to fetch posts!!</div>;
  }

  return (
    <>
      <CreatePost onSubmit={onNewPostSubmitted} />
      <ul className="post-list">
        {postsQuery.data?.map((post) => (
          <li className="card" key={post.id}>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="card-text">
                <span>{post.author}</span>
                {" - "}
                <span>
                  <PostDate createdAt={post.createdAt} />
                </span>
              </p>
              <button
                onClick={() => onViewPostClicked(post.id)}
                className="btn btn-primary"
              >
                View Post
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
