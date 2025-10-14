import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";
import { Calendar } from "lucide-react";
import { currentUser } from "@/lib/auth";

export const Navbar = async () => {
    const user = await currentUser()
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="mx-4 sm:mx-8 flex h-14 items-center">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                </div>
                <div className="flex flex-1 items-center justify-end gap-4">
                    {/* <Button><Calendar size={18} className="mr-2" />Criar Evento</Button> */}
                    <ModeToggle />
                    <UserNav username={user?.name || ""} email={user?.email || ""} profileImageUrl={user?.image || ""} />
                </div>
            </div>
        </header>
  );
};
