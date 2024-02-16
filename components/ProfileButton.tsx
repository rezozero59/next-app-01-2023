"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

  const onLogout = () => {
    signOut();
  };
  // user connected => avatar + menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user?.image || "/img/avatar.png"} />
          <AvatarFallback>{session.user?.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
