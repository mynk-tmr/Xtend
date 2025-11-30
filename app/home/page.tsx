import { TextInput } from "@mantine/core";

export default async function Home() {
  const data = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_limit=10",
  );
  const posts = (await data.json()) as { id: number; title: string }[];

  return (
    <div className="p-4 grid place-content-center h-full">
      <h1 className="text-3xl">Home</h1>
      <ul className="flex flex-col gap-2 min-w-72">
        {posts.map((post) => (
          <TextInput key={post.id} defaultValue={post.title} />
        ))}
      </ul>
    </div>
  );
}
