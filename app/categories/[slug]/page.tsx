import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/page-title";
import PostList from "@/components/post-list";
import { POSTS } from "@/utils/posts";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};
export default function CategoriesPage({ params }: Props) {
  const { slug } = params;
  return (
    <PageContainer>
      <div className="py-10 px-4 ">
        <PageTitle title={slug.replace("-", " ")} />
        <PostList posts={POSTS} />
      </div>
    </PageContainer>
  );
}
