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
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { SyntheticEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { slugify } from "@/utils/slugify";
import Image from "next/image";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: categories, isFetching } = useCategories();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/login");
  }

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;

    if (!files || files.length === 0) return;
    setFile(files[0]);
    setImageObjectUrl(URL.createObjectURL(files[0]));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const image = await uploadImage();

      if (title && catSlug && content && image) {
        await axios.post("/api/posts", {
          title,
          content,
          catSlug,
          slug: slugify(title),
          image,
        });

        // Gestion de la réussite, par exemple rediriger vers une autre page ou afficher un message de succès
        console.log("Post créé avec succès");
        router.push("/some-success-page"); // Redirection après succès
      }
    } catch (error) {
      console.error("Erreur lors de la création du post :", error);
      setSubmitError("Une erreur est survenue lors de la création du post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      const data = new FormData();
      data.append("file", file);
      const response = await axios.post("/api/upload", data);
      return response.data; // Suppose que le serveur renvoie un objet avec une clé imageUrl
    } catch (error) {
      console.error("Erreur lors de l'upload de l'image :", error);
      throw error; // Propager l'erreur pour la gérer dans handleSubmit
    }
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a post" />
        --
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
