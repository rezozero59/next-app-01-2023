"use client";

import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { Category, Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { SyntheticEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { Mutation, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");

  const { data: categories, isFetching } = useCategories();

  const { mutate } = useMutation({
    mutationFn: (newPost: Partial<Post>) => axios.post("/api/posts", newPost),
    onSuccess: (data) => {
      console.log("data ok", data);
    },
  });

  const { data: session } = useSession();

  const router = useRouter();
  if (!session) {
    router.replace("/login");
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (title !== "" && catSlug !== "" && content !== "") {
      await mutate({
        title,
        content,
        catSlug,
        slug: title.trim().toLowerCase().replace(" ", "-"),
        image: "/img/coding-hero.jpg",
      });
    }
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a post" />
        <Input
          type="text"
          placeholder="Title"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
        />
        {isFetching ? (
          <p>Loading categories</p>
        ) : (
          <Select onValueChange={(value) => setCatSlug(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <ReactQuill
          className="mt-6"
          placeholder="Content ..."
          value={content}
          onChange={setContent}
        />
        <Button className="mt-6" onClick={handleSubmit}>
          Publier
        </Button>
      </div>
    </PageContainer>
  );
}
