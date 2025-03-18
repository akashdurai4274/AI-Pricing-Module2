"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type Country = "IN" | "US"

interface CountryContextType {
  country: Country
  setCountry: (country: Country) => void
  convertPrice: (priceInRupees: number) => number
  formatPrice: (price: number) => string
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState<Country>("IN")

  const convertPrice = (priceInRupees: number): number => {
    if (country === "IN") return priceInRupees
    // Approximate conversion rate (1 USD = 75 INR)
    return Math.round(priceInRupees / 75)
  }

  const formatPrice = (price: number): string => {
    if (country === "IN") {
      return `₹${price.toLocaleString("en-IN")}`
    } else {
      return `$${price.toLocaleString("en-US")}`
    }
  }

  return (
    <CountryContext.Provider value={{ country, setCountry, convertPrice, formatPrice }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}

