import React from "react";
import PageContainer from "./PageContainer";
import { HeaderNavigation } from "./HeaderNavigation";
import ProfileButton from "./ProfileButton";
import ResponsiveMenu from "./ResponsiveMenu";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" p-4 border-b">
      <PageContainer>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ResponsiveMenu />
            <Link href="/">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
                LD BLOG
              </h1>
            </Link>
          </div>

          <HeaderNavigation />

          <div className="flex items-center gap-2">
            <ToggleTheme />
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
