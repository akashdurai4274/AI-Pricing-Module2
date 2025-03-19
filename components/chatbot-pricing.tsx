"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/context/country-context";
import { useEffect, useState } from "react";

interface ChatbotPricingProps {
  onCalculatePrice: (plan: string) => void;
}

export default function ChatbotPricing({
  onCalculatePrice,
}: ChatbotPricingProps) {
  const { formatPrice, convertPrice } = useCountry();
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
  const intelligencePrice = 1999;
  const superIntelligencePrice = 6999;

  const handleCalculatePrice = (plan: string) => {
    // Call the global function if it exists
    if (typeof window !== "undefined" && window.selectPlanAndScroll) {
      window.selectPlanAndScroll("chatbot", plan);
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
      {/* Intelligence Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-1">
          Intelligence
        </h3>
        <p className="text-sm text-gray-500 mb-4">for support automation</p>

        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold">
            {formatPrice(convertPrice(intelligencePrice))}
          </span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>

        <button
          onClick={() => handleCalculatePrice("intelligence")}
          className="text-blue-600 text-sm mb-6 underline"
        >
          Calculate your price
        </button>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>60 free chats</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>2 chatbots</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>Widget customisation</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>Lead generation</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>CRM integration</span>
          </li>
        </ul>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Addons</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>AI on WhatsApp</span>
            </li>
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>Upto 200 extra chats</span>
            </li>
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>No Tring AI branding</span>
            </li>
          </ul>
        </div>

        <Button className="w-full border border-[#FDB137] text-[#FDB137] font-semibold py-3 px-6 rounded-lg shadow-md shadow-[#FDB137]/50 bg-white transition">
          Choose plan
        </Button>
      </div>

      {/* Super Intelligence Plan */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 mb-1">
          Super Intelligence
        </h3>
        <p className="text-sm text-gray-500 mb-4">for lead generation</p>

        <div className="mb-4">
          <span className="text-xl md:text-2xl font-bold">
            {formatPrice(convertPrice(superIntelligencePrice))}
          </span>
          <span className="text-gray-500 text-sm">/month</span>
        </div>

        <button
          onClick={() => handleCalculatePrice("super-intelligence")}
          className="text-blue-600 text-sm mb-6 underline"
        >
          Calculate your price
        </button>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>250 free chats</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>10 chatbots</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>Lead generation</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>CRM integration</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-green-500 mr-2 mt-0.5" />
            <span>Widget customisation</span>
          </li>
        </ul>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Addons</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>AI on WhatsApp</span>
            </li>
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>Upto 1,000 extra chats</span>
            </li>
            <li className="flex items-center">
              <Plus size={16} className="text-blue-500 mr-2" />
              <span>No Tring AI branding</span>
            </li>
          </ul>
        </div>

        <Button className="w-full border border-[#FDB137] text-[#FDB137] font-semibold py-3 px-6 rounded-lg shadow-md shadow-[#FDB137]/50 bg-white transition">
          Choose plan
        </Button>
      </div>

      {/* Enterprise Plan */}
      <div className="bg-blue-600 text-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-1">Enterprise</h3>
        <p className="text-sm opacity-80 mb-4">for lead generation</p>

        <div className="mb-4">
          <span className="text-2xl font-bold">Talk to sales</span>
        </div>

        <button className="text-white text-sm mb-6 underline">
          Contact us
        </button>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>1000+ free chats</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>Unlimited chatbots</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>Lead generation</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>CRM integration</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>Widget customisation</span>
          </li>
          <li className="flex items-start">
            <Check size={18} className="text-white mr-2 mt-0.5" />
            <span>No Tring AI branding</span>
          </li>
        </ul>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Addons</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check size={16} className="text-white mr-2" />
              <span>AI on WhatsApp</span>
            </li>
            <li className="flex items-center">
              <Check size={16} className="text-white mr-2" />
              <span>Unlimited extra chats</span>
            </li>
          </ul>
        </div>

        <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white">
          Contact sales
        </Button>
      </div>
    </div>
  );
}
