import { Post } from "@/types";
import Postcard from "./post-card";

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post: Post) => (
        <Postcard key={post.id} post={post} />
      ))}
    </div>
  );
}
