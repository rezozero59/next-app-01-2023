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
import { slugify } from "@/utils/slugify";
import Image from "next/image";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [file, setFile] = useState<File>();
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

  const [content, setContent] = useState("");

  const { data: categories, isFetching } = useCategories();

  // @ts-ignore
  const { mutate } = useMutation({
    mutationFn: (newPost) => axios.post("/api/posts", newPost),
    onSuccess: (data) => {
      console.log("data ok", data);
    },
    // Vous pouvez ajouter onError ici pour gérer les erreurs
    onError: (error) => {
      console.error("Erreur lors de la création du post :", error);
    },
  });

  const { data: session } = useSession();

  const router = useRouter();
  if (!session) {
    router.replace("/login");
  }

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files || !files[0]) return;
    setFile(files[0]);
    setImageObjectUrl(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const image = await uploadImage();
    console.log("image", image);

    if (title !== "" && catSlug !== "" && content !== "" && image) {
      // @ts-ignore
      mutate({
        title,
        content,
        catSlug,
        slug: slugify(title),
        image,
      });
    }
  };

  const uploadImage = async () => {
    try {
      if (!file) return;

      const data = new FormData();
      data.set("file", file);
      const response = await axios.post("/api/upload", data);
      return response.data; // {imageUrl: "/images/1234_file.jpg"}
    } catch (error) {
      console.error("error in upLoadImage", error);
    }
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a post" />
        {/* image */}
        <div className="mb-6">
          {imageObjectUrl && (
            <div className="relative w-40 h-40 mx-auto mb-4">
              <Image src={imageObjectUrl} fill alt={title} objectFit="cover" />
            </div>
          )}

          <Input type="file" onChange={onChangeFile} />
        </div>

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
