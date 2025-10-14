"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text font-bold text-xl">
            Goads
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <DesktopNav />
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/register">Começar grátis</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/#services" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Serviços
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/#testimonials" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Depoimentos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/sobre" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Sobre
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink href="/" onOpenChange={setOpen} className="text-xl font-bold">
          <span className="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
            Goads
          </span>
        </MobileLink>
        <div className="flex flex-col space-y-3 pt-6">
          <MobileLink href="/#services" onOpenChange={setOpen}>
            Serviços
          </MobileLink>
          <MobileLink href="/#testimonials" onOpenChange={setOpen}>
            Depoimentos
          </MobileLink>
          <MobileLink href="/calculadora" onOpenChange={setOpen}>
            Calculadora
          </MobileLink>
          <MobileLink href="/sobre" onOpenChange={setOpen}>
            Sobre
          </MobileLink>
        </div>
        <div className="flex flex-col space-y-2 border-t pt-4 mt-4">
          <MobileLink href="/auth/login" onOpenChange={setOpen}>
            Login
          </MobileLink>
          <Button asChild>
            <Link href="/auth/register">Começar grátis</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const handleClick = () => {
    onOpenChange?.(false)
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn("text-foreground/80 font-medium transition-colors hover:text-foreground", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
