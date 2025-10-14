import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero";
import Footer from "@/components/footer";
import Benefits from "@/components/benefits";
import Features from "@/components/features";
import Services from "@/components/services";
import HowItWorks from "@/components/howItWorks";
import Testimonials from "@/components/testimonials";
import Contact from "@/components/contact";
import Faq from "@/components/faq";
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center">
      <Navbar/>
      <HeroSection/>
      <Benefits/>
      <Features/>
      <Services/>
      <HowItWorks/>
      <Testimonials/>
      <Contact/>
      <Faq/>
      <Footer/> 
    </main>
  )
}
