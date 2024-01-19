import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Category } from "@/types";
import { CATEGORIES } from "@/utils/categories";

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-6 h-6 md:hidden text-gray-500" />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <Link href="/write">
            <Button variant="ghost">Write A Post</Button>
          </Link>
          <p>Catégories</p>
          {CATEGORIES.map((category: Category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="block px-2 py-1 text-lg"
            >
              <Button variant="ghost">{category.name}</Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
