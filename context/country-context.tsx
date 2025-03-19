"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";

interface CountryContextType {
  country: string;
  setCountry: (country: string) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [country, setCountry] = useState<string>("IN");

  // Ensure hydration matching by setting state in useEffect
  useEffect(() => {
    // Check localStorage for persisted country selection
    const savedCountry = localStorage.getItem("preferredCountry");
    if (savedCountry) {
      setCountry(savedCountry);
    }
  }, []);

  const formatPrice = (price: number) => {
    if (country === "IN") {
      return `₹${price.toLocaleString("en-IN")}`;
    } else {
      return `$${price.toLocaleString("en-US")}`;
    }
  };

  const convertPrice = (price: number) => {
    if (country === "US") {
      return Math.round(price / 80);
    }

    return price;
  };

  // Update localStorage when country changes
  useEffect(() => {
    localStorage.setItem("preferredCountry", country);
  }, [country]);

  const value: CountryContextType = {
    country,
    setCountry,
    formatPrice,
    convertPrice,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
