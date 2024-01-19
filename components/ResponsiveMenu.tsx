import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6  text-gray-500" />
      </SheetTrigger>
      <SheetContent side="left">
        <div>
          <Link href="/write">
            <Button variant="ghost">Write A Post</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
