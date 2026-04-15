import { useForm } from "react-hook-form";

export function CreatePost({ onSubmit }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  function onSubmitWrapper(data) {
    onSubmit?.(data);
    reset();
  }

  return (
    <form className="form mb-5" onSubmit={handleSubmit(onSubmitWrapper)}>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          {...register("title", {
            required: {
              message: "Title is required",
              value: true,
            },
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters long",
            },
          })}
        />
        {errors["title"] && (
          <p className="form-text text-danger">{errors["title"].message}</p>
        )}
      </div>
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
