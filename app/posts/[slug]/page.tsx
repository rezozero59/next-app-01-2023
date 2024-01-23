import { Post } from "@/types";
import PageContainer from "@/components/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Eye, MessageCircle } from "lucide-react";

export default function SinglePostPage() {
  const POST: Post = {
    id: 1,
    category: "React",
    title: "React State Management: Choosing the Right Solution",
    image: "/react-state-management.jpg",
    caption:
      "Explore different state management solutions in React and choose the one that fits your needs.",
    date: "2023-01-15",
    minutesToRead: 10,
    author: "John ReactDev",
    nbViews: 25,
    nbComments: 8,
    slug: "react-state-management-choosing-right-solution",
    content: "lorem ipsum",
  };

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
                {POST.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 mb-4">
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/avatar.png" alt="avatar" />
              <AvatarFallback>{POST.author}</AvatarFallback>
            </Avatar>
            <div>
              <p>{POST.author}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Posté le
                {new Date(POST.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            <MessageCircle size={24} />
            <p>{POST.nbComments}</p>
          </div>
          <div className="flex items-center gap-1 ">
            <Eye size={24} />
            <p>{POST.nbComments}</p>
          </div>
        </div>
        <Separator />
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{
            __html: POST.content as string,
          }}
        ></div>
      </div>
    </PageContainer>
  );
}
