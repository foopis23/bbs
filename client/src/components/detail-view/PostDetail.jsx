import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePostById, getPostById } from "../../services/bbs";
import { PostDate } from "../PostDate";
import { ReplyList } from "./ReplyList";
import { NewReplyForm } from "./NewReplyForm";

export function PostDetail({ postId, onGoBack }) {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["bbs", "posts", postId],
    queryFn: () => getPostById(postId),
  });

  const deletePostMutation = useMutation({
    mutationFn: () => deletePostById(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bbs", "posts"] });
      onGoBack();
    },
  });

  if (postQuery.isLoading) {
    return "Loading...";
  }

  if (postQuery.isError) {
    return <div className="alert">Failed to fetch posts!!</div>;
  }

  return (
    <>
      <div className="mb-4">
        <button onClick={() => onGoBack()} className="btn btn-primary">
          Go Back
        </button>
        <button
          onClick={() => deletePostMutation.mutate()}
          className="btn btn-danger"
        >
          Delete Post
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{postQuery.data.title}</h2>
          <p className="card-subtitle mb-2 text-muted">
            {postQuery.data.author} -{" "}
            {<PostDate createdAt={postQuery.data.createdAt} />}
          </p>
          <p className="card-text">{postQuery.data.body}</p>
        </div>
      </div>
      <h3>Replies</h3>
      <NewReplyForm postId={postId} />
      <ReplyList replies={postQuery.data.replies} />
    </>
  );
}
