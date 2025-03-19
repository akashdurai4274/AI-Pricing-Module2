"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/context/country-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Us from "./Us";
import India from "./India";
import { useState, useEffect } from "react";

export default function Header() {
  const { country, setCountry } = useCountry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    // Force refresh prices by triggering a small state update
    const event = new CustomEvent("countryChanged", { detail: newCountry });
    window.dispatchEvent(event);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="tring.png"
              alt="Tring AI Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-semibold text-gray-800">Tring AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700">
                Products <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Chatbot</DropdownMenuItem>
                <DropdownMenuItem>Voicebot</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700">
                Industry <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Healthcare</DropdownMenuItem>
                <DropdownMenuItem>E-commerce</DropdownMenuItem>
                <DropdownMenuItem>Finance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700">
                Use cases <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Customer Support</DropdownMenuItem>
                <DropdownMenuItem>Lead Generation</DropdownMenuItem>
                <DropdownMenuItem>Booking</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/features"
              className="text-sm font-medium text-gray-700"
            >
              Features
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-medium text-gray-700"
            >
              About Us
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700">
              Pricing
            </Link>
            <Link href="/blogs" className="text-sm font-medium text-gray-700">
              Blogs
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden sm:flex bg-[#FDB137] hover:bg-[#f0a52c] text-white shadow-[0_4px_14px_0_rgba(253,177,55,0.4)]">
              Book a Demo
            </Button>

            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {country === "IN" ? (
                    <span className="flex items-center">
                      <India />
                      <span className="ml-1">IN</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Us />
                      <span className="ml-1">US</span>
                    </span>
                  )}
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleCountryChange("IN")}>
                    <India />
                    India (₹)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCountryChange("US")}>
                    <Us />
                    United States ($)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg z-50">
          <div className="flex flex-col p-4 space-y-4">
            <div className="py-2 border-b">
              <div className="font-medium mb-2">Products</div>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Chatbot
              </Link>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Voicebot
              </Link>
            </div>

            <div className="py-2 border-b">
              <div className="font-medium mb-2">Industry</div>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Healthcare
              </Link>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                E-commerce
              </Link>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Finance
              </Link>
            </div>

            <div className="py-2 border-b">
              <div className="font-medium mb-2">Use cases</div>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Customer Support
              </Link>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Lead Generation
              </Link>
              <Link href="#" className="block py-1 text-sm text-gray-600">
                Booking
              </Link>
            </div>

            <Link
              href="/features"
              className="py-2 text-sm font-medium text-gray-700"
            >
              Features
            </Link>
            <Link
              href="/about-us"
              className="py-2 text-sm font-medium text-gray-700"
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className="py-2 text-sm font-medium text-gray-700"
            >
              Pricing
            </Link>
            <Link
              href="/blogs"
              className="py-2 text-sm font-medium text-gray-700"
            >
              Blogs
            </Link>

            <div className="pt-2 flex flex-col space-y-3">
              <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white shadow-[0_4px_14px_0_rgba(253,177,55,0.4)]">
                Book a Demo
              </Button>

              <div className="flex items-center justify-between">
                <span className="text-sm">Country/Region:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCountry("IN")}
                    className={`flex items-center gap-1 p-1 rounded ${
                      country === "IN" ? "bg-gray-100" : ""
                    }`}
                  >
                    <India /> IN
                  </button>
                  <button
                    onClick={() => setCountry("US")}
                    className={`flex items-center gap-1 p-1 rounded ${
                      country === "US" ? "bg-gray-100" : ""
                    }`}
                  >
                    <Us /> US
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
