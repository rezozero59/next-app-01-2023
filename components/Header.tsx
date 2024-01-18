import React from "react";
import PageContainer from "./PageContainer";
import { HeaderNavigation } from "./HeaderNavigation";

export default function Header() {
  return (
    <header className=" p-4 border-b">
      <PageContainer>
        <div>
          {/* responsive menu */}
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-blue-600">
            NextBlog
          </h1>
        </div>
        {/* Navigation chadcn */}
        <HeaderNavigation />
        {/* buttons */}
      </PageContainer>
    </header>
  );
}
