// Get single post

import { Post } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

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
