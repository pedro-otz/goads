"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu } from "../menu";
import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarToggle } from "@/components/sidebar-toggle";
import Logo from "@/public/boneco sem perna.png"
import Image from "next/image";

export function Sidebar() {
    const sidebar = useStore(useSidebar, (x) => x);
    if (!sidebar) return null;
    const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20  -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                !getOpenState() ? "w-[90px]" : "w-[250px]",
                settings.disabled && "hidden"
            )}
        >
            <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
            >
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        !getOpenState() ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                >
                    <Link href={"/"}>
                        <h2 className="text-xl font-bold"><span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">Goads</span></h2>
                    </Link>
                </Button>
                <Menu isOpen={getOpenState()} />
            </div>
        </aside>
    );
}
