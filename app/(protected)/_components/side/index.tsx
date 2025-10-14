import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bookmark, FileIcon, HomeIcon, LogOutIcon, MenuIcon, MessageSquare, MountainIcon, SettingsIcon, UserRound, UsersIcon } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { LogoutButton } from "@/components/auth/logout-button"
export default async function Component() {

  return (
    <div className="flex min-h-fit">
      <div className="hidden lg:block border-r w-[16rem]">
        <div className="flex h-full flex-col justify-between px-6 py-4">
          <div className="mb-4"><ModeToggle/></div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              Profile
            </Link> 

            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
            <Bookmark  className="h-4 w-4"/>
              Saves
            </Link> 

            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              prefetch={false}
            >
              <MessageSquare  className="h-4 w-4" />
              Feedback
            </Link>
            <aside className="">
          </aside>
          </nav>
          <div className="mt-auto space-y-2 border-t pt-4">
                <LogoutButton/>
            </div>
        </div>
      </div>
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-muted/40 px-4 lg:hidden">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className=""><ModeToggle/></div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-2 px-4 py-6">
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                  >
                  <UserRound className="h-4 w-4"/>
                  
                    Profile
                  </Link> 
                <Link
                  href="/posts-saves"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                <Bookmark  className="h-4 w-4"/>
                  Saves
                </Link> 
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  prefetch={false}
                >
                  <MessageSquare  className="h-4 w-4" />
                  Feedback
                </Link>
              </nav>
              <div className="mt-auto space-y-2 border-t pt-4">
                <LogoutButton/>
                </div>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  )
}
