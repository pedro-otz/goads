import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from '@/components/theme-provider'
import localFont from '@next/font/local'
import { Navbar } from '@/components/navbar'
import Contact from '@/components/contact'
import Faq from '@/components/faq'
import Footer from '@/components/footer'
import { CalendarProvider } from './(protected)/calendar/contexts/calendar-context'
import { db } from '@/lib/db'
import { currentUser } from '@/lib/auth'
import { RxInstagramLogo } from "react-icons/rx";
import { FaMeta } from "react-icons/fa6";

const thunky = localFont({
  src: [
    {
      path: "../public/fonts/Thunky.otf",
      weight: '800',
    }
  ],
  variable: '--font-thunky'
})
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Goads',
  description: '',
}

// async function getEventsForCalendar(userId: string) {
//   const posts = await db.scheduledPost.findMany({
//     where: { userId },
//     include: { medias: true },
//   });

//   return posts.map((p) => ({
//     id: p.id,
//     title: p.platform === "INSTAGRAM" ? <RxInstagramLogo/> : <FaMeta/>,
//     description: p.caption || "",
//     startDate: p.scheduledAt.toISOString(),
//     endDate: p.scheduledAt.toISOString(),
//     color:
//       p.status === "SCHEDULED"
//         ? "blue"
//         : p.status === "PUBLISHED"
//         ? "green"
//         : "red",
//     user: {
//       id: userId,
//       name: "Você",
//     },
//   }));
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  const user = await currentUser();

  let events: any[] = [];
  // if (user?.id) {
  //   events = await getEventsForCalendar(user.id);
  // }

  return (
    <SessionProvider session={session}>
      <html lang="pt-br">
        <body className={`${inter.className} ${thunky.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <CalendarProvider users={[{ id: user?.id || "0", name: "Você" }]} events={events}>
              {children}
            </CalendarProvider>
          </ThemeProvider>

        </body>
      </html>
    </SessionProvider>
  )
}
