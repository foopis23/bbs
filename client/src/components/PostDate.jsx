export function PostDate({ createdAt }) {
  return (
    <>
      {new Date(createdAt).toLocaleDateString() +
        " " +
        new Date(createdAt).toLocaleTimeString()}
    </>
  );
}
