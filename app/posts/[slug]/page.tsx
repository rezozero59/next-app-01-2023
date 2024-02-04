"use client";

import PageContainer from "@/components/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Eye, MessageCircle } from "lucide-react";
import { usePost } from "@/hooks/usePost";

export default function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { data: post, isFetching, error } = usePost(slug);
  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <PageContainer>
      <div className="p-8">
        <div
          style={{ backgroundImage: "url(/img/coding-hero.jpg)" }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white ">
                {post?.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 mb-4">
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/avatar.png" alt="avatar" />
              {/* <AvatarFallback>{post?.author}</AvatarFallback> */}
            </Avatar>
            <div>
              {/* <p>{post?.author}</p> */}
              {post?.createdAt && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Posté le
                  {new Date(post?.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            <MessageCircle size={24} />
            <p>{post?.nbComments}</p>
          </div>
          <div className="flex items-center gap-1 ">
            <Eye size={24} />
            <p>{post?.views}</p>
          </div>
        </div>
        <Separator />
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{
            __html: post?.content as string,
          }}
        ></div>
      </div>
    </PageContainer>
  );
}
