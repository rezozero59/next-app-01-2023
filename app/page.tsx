"use client";

import PageContainer from "@/components/PageContainer";
import PostList from "@/components/post-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/categories";
import { POSTS } from "@/utils/posts";
import Link from "next/link";

export default function Home() {
  return (
    <PageContainer>
      <div className="py-10 px-4">
        <div
          style={{ backgroundImage: "url(/img/coding-hero.jpg)" }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white ">
                Deviens un bon dev web
              </h1>
              <Input
                type="email"
                placeholder="Email"
                className="dark:bg-white mt-4 text-black dark:text-black"
              />
              <Button size="lg" className="w-full py-6 text-xl mt-4">
                Inscris-toi
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
          {CATEGORIES.map((category: Category) => (
            <Button variant="outline" key={category.id}>
              <Link href={`/categories/${category.id}`}>{category.name}</Link>
            </Button>
          ))}
        </div>

        {/* Articles */}

        <PostList posts={POSTS} />
      </div>
    </PageContainer>
  );
}
