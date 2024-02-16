"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function WritePage() {
  const { data: session } = useSession();

  const router = useRouter();
  if (!session) {
    router.replace("/login");
  }

  return <div>WritePage</div>;
}
