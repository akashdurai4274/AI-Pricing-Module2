import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import PricingTabs from "@/components/pricing-tabs"
import EstimateSection from "@/components/estimate-section"
import { CountryProvider } from "@/context/country-context"

// Add global type declaration
declare global {
  interface Window {
    selectPlanAndScroll: (type: string, plan: string) => void
  }
}

export default function Home() {
  return (
    <CountryProvider>
      <div className="min-h-screen bg-[#FFF8F3]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <HeroSection />
          <PricingTabs />
          <EstimateSection />
        </main>
      </div>
    </CountryProvider>
  )
}

