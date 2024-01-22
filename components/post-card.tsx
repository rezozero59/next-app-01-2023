import { Post } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="flex flex-col justify-between rounded-lg border-2">
        <CardHeader>
          <div className="aspect-square relative">
            <Image
              src="/img/coding-hero.jpg"
              alt={post.title}
              fill
              className="aspect-square object-cover transition-all duration-300 hover:scale-110"
            />
          </div>
        </CardHeader>

        <CardContent></CardContent>

        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
}
