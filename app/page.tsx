"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="outline" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push("/categories/routertest")}
      >
        Catégories
      </Button>
      <Eye size={32} />
      <Badge variant="default">Hello</Badge>
    </main>
  );
}
