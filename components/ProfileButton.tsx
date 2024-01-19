import Link from "next/link";
import { Button } from "./ui/button";

export default function ProfileButton() {
  // user connected => avatar + menu
  // user not connected => login button
  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
