import PageContainer from "@/components/PageContainer";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import React from "react";

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Login or register" />
        <div className="flex flex-col gap-4 max-w-sm mx-auto ">
          <Button>
            <Github className="mr-3" />
            Signin with Github
          </Button>
          <Button>
            <Mail className="mr-3" />
            Signin with Google
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
