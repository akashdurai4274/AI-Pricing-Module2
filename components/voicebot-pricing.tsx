"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/context/country-context";
import { useEffect, useState } from "react";

interface VoicebotPricingProps {
  onCalculatePrice: (plan: string) => void;
}

export default function VoicebotPricing({
  onCalculatePrice,
}: VoicebotPricingProps) {
  const { formatPrice, convertPrice, country } = useCountry();
  const [mounted, setMounted] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Ensure hydration matching and listen for currency changes
  useEffect(() => {
    setMounted(true);

    // Listen for currency changes
    const handleCurrencyChange = () => {
      setForceUpdate((prev) => prev + 1);
    };

    window.addEventListener("countryChanged", handleCurrencyChange);

    return () => {
      window.removeEventListener("countryChanged", handleCurrencyChange);
    };
  }, []);

  const fluentPrice = 14999;
  const lucidPrice = 39999;

  const handleCalculatePrice = (plan: string) => {
    // Call the global function if it exists
    if (typeof window !== "undefined" && window.selectPlanAndScroll) {
      window.selectPlanAndScroll("voicebot", plan);
    } else {
      // Fallback to the prop function
      onCalculatePrice(plan);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Fluent Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold text-blue-600 mb-1">
          Fluent
        </h3>
        {/*         <p className="text-sm text-gray-500 mb-4">Month</p>
         */}
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold">
            {formatPrice(convertPrice(fluentPrice))}
          </span>
          <span className="text-gray-500 text-xs md:text-sm">/month</span>
        </div>

        <button
          onClick={() => handleCalculatePrice("fluent")}
          className="text-blue-600 text-sm mb-6 underline"
        >
          Calculate your price
        </button>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Lead Gen</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>CRM Integration</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Real Time Booking</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>1500 Mins</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>{country === "IN" ? "₹6" : "$0.08"} per Extra Minute</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Voice Customization</span>
          </li>
          <li className="flex items-start">
            <div className="bg-gray-100 rounded-full p-1 mr-2">
              <X size={14} className="text-gray-600" />
            </div>
            <span>Multi-lingual</span>
          </li>
        </ul>

        <Button className=" mt-5 w-full border border-[#FDB137] text-[#FDB137] font-semibold py-3 px-6 rounded-lg shadow-md shadow-[#FDB137]/50 bg-white transition">
          Choose plan
        </Button>
      </div>

      {/* Lucid Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold text-blue-600 mb-1">
          Lucid
        </h3>

        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold">
            {formatPrice(convertPrice(lucidPrice))}
          </span>
          <span className="text-gray-500 text-xs md:text-sm">/month</span>
        </div>

        <button
          onClick={() => handleCalculatePrice("lucid")}
          className="text-blue-600 text-sm mb-6 underline"
        >
          Calculate your price
        </button>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Lead Gen</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>CRM Integration</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Real Time Booking</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>5000 Mins</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>{country === "IN" ? "₹8" : "$0.10"} per Extra Minute</span>{" "}
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Advanced Voice Customization</span>
          </li>
          <li className="flex items-start">
            <div className="bg-blue-100 rounded-full p-1 mr-2">
              <Check size={14} className="text-blue-600" />
            </div>
            <span>Multi-lingual</span>
          </li>
        </ul>

        <Button className="w-full border border-[#FDB137] text-[#FDB137] font-semibold py-3 px-6 rounded-lg shadow-md shadow-[#FDB137]/50 bg-white transition">
          Choose plan
        </Button>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-blue-600 text-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg md:text-xl font-semibold mb-1">
          Eloquent (Enterprise)
        </h3>
        <p className="text-sm opacity-80 mb-4"></p>

        <div className="mb-4">
          <span className="text-2xl font-bold">Talk to sales</span>
        </div>

        <div className="mb-6 h-4"></div>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>Lead Gen</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>CRM Integration</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>Real Time Booking</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>10,000+ Mins</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>Talk to Sales for Extra Mins Cost</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>Advanced Voice Customization</span>
          </li>
          <li className="flex items-start">
            <div className="bg-white/20 rounded-full p-1 mr-2">
              <Check size={14} className="text-white" />
            </div>
            <span>Multi-lingual</span>
          </li>
        </ul>

        <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white">
          Choose plan
        </Button>
      </div>
    </div>
  );
}
