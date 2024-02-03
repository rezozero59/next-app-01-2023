// Get single post

import { Post } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

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

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  // api/posts/react-native
  // slug en params
  // -->DB -->post
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Post not found",
      },
      { status: 500 }
    );
  }
};
