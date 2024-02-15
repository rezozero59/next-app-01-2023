"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function ProfileButton() {
  const { data: session, status } = useSession();
  console.log("session", session, status);

  // user not connected => login button
  // or status === "status ==="unauthenticated"
  if (!session) {
    return (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    );
  }
  // user connected => avatar + menu
  return {};
}
