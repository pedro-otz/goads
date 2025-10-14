import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetHeader,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from "@/components/ui/sheet";
import { LoginButton } from "../auth/login-button";
import { ModeToggle } from "../ui/mode-toggle";

export function SheetMenu() {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
                <Button className="h-8" variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
            <ModeToggle />
                <SheetHeader>
                    <Button
                        className="flex justify-center items-center pb-2 pt-1"
                        variant="link"
                        asChild
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <SheetTitle className="font-bold text-lg">Goads</SheetTitle>
                        </Link>
                    </Button>
                    <Link href={'/events'} className="text-sm border p-2 rounded-lg shadow-md">
                        Criar Evento
                    </Link>
                    <Link href={'/fav'} className="text-sm border p-2 rounded-lg shadow-md">
                        Meus Eventos
                    </Link>
                    <LoginButton>
                        <Button className="w-full">Login</Button>
                    </LoginButton>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
