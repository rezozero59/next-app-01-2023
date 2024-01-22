import { Post } from "@/types";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return <div>{post.title}</div>;
}
