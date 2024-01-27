// Get single post

import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  // api/posts/react-native
  // slug en params
  // -->DB -->post
  return NextResponse.json(params.slug, { status: 200 });
};
