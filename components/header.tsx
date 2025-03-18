"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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

export default function Header() {
  const { country, setCountry } = useCountry();

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

          <Link href="/features" className="text-sm font-medium text-gray-700">
            Features
          </Link>
          <Link href="/about-us" className="text-sm font-medium text-gray-700">
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
          <Button className="bg-[#FDB137] hover:bg-[#f0a52c] text-white shadow-[0_4px_14px_0_rgba(253,177,55,0.4)]">
            Book a Demo
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {country === "IN" ? (
                <span className="flex items-center">
                  {/* <Image
                    src="/placeholder.svg?height=20&width=30"
                    alt="India Flag"
                    width={20}
                    height={15}
                    className="mr-1"
                  /> */}
                  <India />
                  IN
                </span>
              ) : (
                <span className="flex items-center">
                  {/* <Image
                    src="/placeholder.svg?height=20&width=30"
                    alt="US Flag"
                    width={20}
                    height={15}
                    className="mr-1"
                  /> */}
                  <Us />
                  US
                </span>
              )}
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCountry("IN")}>
                <Image
                  src="/placeholder.svg?height=20&width=30"
                  alt="India Flag"
                  width={20}
                  height={15}
                  className="mr-2"
                />
                India (₹)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCountry("US")}>
                <Image
                  src="/placeholder.svg?height=20&width=30"
                  alt="US Flag"
                  width={20}
                  height={15}
                  className="mr-2"
                />
                United States ($)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
