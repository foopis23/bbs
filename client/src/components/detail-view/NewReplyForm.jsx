import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReply } from "../../services/bbs";

export function NewReplyForm({ postId }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const createReplyMutation = useMutation({
    mutationFn: (data) => createReply(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bbs", "posts", postId] });
      reset();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  function onSubmit(data) {
    createReplyMutation.mutate(data);
  }

  if (createReplyMutation.isPending) {
    return <p>Loading...</p>;
  }

  return (
    <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
      {createReplyMutation.isError && (
        <div className="alert">{createReplyMutation.error.message}</div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          {...register("author", {
            required: {
              message: "Author is required",
              value: true,
            },
            minLength: {
              value: 3,
              message: "Author must be at least 3 characters long",
            },
          })}
        />
        {errors["author"] && (
          <p className="form-text text-danger">{errors["author"].message}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Contents
        </label>
        <textarea
          className="form-control"
          {...register("body", {
            required: {
              message: "Content is required",
              value: true,
            },
            minLength: {
              value: 3,
              message: "Content must be at least 3 characters long",
            },
          })}
        />
        {errors["body"] && (
          <p className="form-text text-danger">{errors["body"].message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Post
      </button>
    </form>
  );
}
