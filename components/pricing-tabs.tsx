"use client";

import { useState, useRef } from "react";
import ChatbotPricing from "./chatbot-pricing";
import VoicebotPricing from "./voicebot-pricing";
import EstimateSection from "./estimate-section";

export default function PricingTabs() {
  const [activeTab, setActiveTab] = useState("chatbot");
  console.log(activeTab + " activeTab");
  const chatbotCalculatorRef = useRef<HTMLDivElement>(null);
  const voicebotCalculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = (type: string) => {
    if (type === "chatbot" && chatbotCalculatorRef.current) {
      chatbotCalculatorRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (type === "voicebot" && voicebotCalculatorRef.current) {
      voicebotCalculatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="">
      <div className=" px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 ">
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex rounded-lg overflow-hidden shadow-sm p-1  bg-white">
            <button
              onClick={() => setActiveTab("chatbot")}
              className={`w-1/2 py-3 md:py-5 text-base md:text-xl font-medium transition-colors rounded-lg ${
                activeTab === "chatbot"
                  ? "bg-[#FDB137] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              Chatbot
            </button>
            <button
              onClick={() => setActiveTab("voicebot")}
              className={`w-1/2 py-3 md:py-5 text-base md:text-xl font-medium transition-colors rounded-lg ${
                activeTab === "voicebot"
                  ? "bg-[#FDB137] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              Voicebot
            </button>
          </div>
        </div>

        <div>
          {activeTab === "chatbot" && (
            <ChatbotPricing
              onCalculatePrice={(plan) => scrollToCalculator("chatbot")}
            />
          )}
          {activeTab === "voicebot" && (
            <VoicebotPricing
              onCalculatePrice={(plan) => scrollToCalculator("voicebot")}
            />
          )}
        </div>
      </div>
      <EstimateSection activeTab={activeTab} />
    </div>
  );
}
