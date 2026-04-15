import { PostDate } from "../PostDate";

export function ReplyList({ replies }) {
  return replies.map((reply) => (
    <div className="card" key={reply.id}>
      <div className="card-body">
        <h4 className="card-title">{reply.author}</h4>
        <span className="text-sm mb-2 text-muted">
          <PostDate createdAt={reply.createdAt} />
        </span>
        <p className="card-text">{reply.body}</p>
      </div>
    </div>
  ));
}
