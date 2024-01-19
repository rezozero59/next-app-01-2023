import React from "react";
import PageContainer from "./PageContainer";
import { HeaderNavigation } from "./HeaderNavigation";
import ProfileButton from "./ProfileButton";
import ResponsiveMenu from "./ResponsiveMenu";

export default function Header() {
  return (
    <header className=" p-4 border-b">
      <PageContainer>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ResponsiveMenu />

            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
              NextBlog
            </h1>
          </div>
          {/* Navigation chadcn */}
          <HeaderNavigation />
          {/* buttons */}
          <div className="flex items-center">
            {/* Toogle Dark Mode */}
            <ProfileButton />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
