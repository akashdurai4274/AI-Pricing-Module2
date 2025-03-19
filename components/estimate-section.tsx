"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useCountry } from "@/context/country-context";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function EstimateSection({ activeTab }: { activeTab: string }) {
  console.log("activeTab " + activeTab);
  const { formatPrice, convertPrice, country } = useCountry();

  const [chatbotActive, setChatbotActive] = useState(activeTab === "chatbot");
  const [voicebotActive, setVoicebotActive] = useState(
    activeTab === "voicebot"
  );
  // Sync state with activeTab whenever it changes
  useEffect(() => {
    setChatbotActive(activeTab === "chatbot");
    setVoicebotActive(activeTab === "voicebot");
    console.log(
      "Updated States → Chat:",
      chatbotActive,
      "Voice:",
      voicebotActive
    );
  }, [activeTab]);

  console.log("Final → Chat:", chatbotActive, "Voice:", voicebotActive);

  const [chatCount, setChatCount] = useState(60);
  const [minuteCount, setMinuteCount] = useState(1500);
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const calculatorRef = useRef<HTMLDivElement>(null);
  const voicebotRef = useRef<HTMLDivElement>(null);
  const [selectedChatbotPlan, setSelectedChatbotPlan] =
    useState("intelligence");
  const [selectedVoicebotPlan, setSelectedVoicebotPlan] = useState("fluent");

  // Chatbot addons
  const [chatbotAddons, setChatbotAddons] = useState({
    leadGeneration: true,
    whatsapp: true,
    crmIntegration: false,
    noTringBranding: false,
  });

  // Voicebot addons
  const [voicebotAddons, setVoicebotAddons] = useState({
    multipleLanguages: false,
    customVoice: false,
    cloudTelephony: true,
    noTringBranding: false,
  });

  // Calculate chatbot pricing
  const calculateChatbotPrice = () => {
    let basePrice = 0;
    let extraChats = 0;
    let extraChatPrice = 0;
    let whatsappCost = 0;
    let freeChatLimit = 0;
    let extraChatRate = 0;
    let plan = "";

    // Use the selected plan to determine pricing parameters
    if (selectedChatbotPlan === "intelligence") {
      basePrice = 1999;
      freeChatLimit = 60;
      extraChatRate = 10;
      plan = "Intelligence";
    } else {
      // super-intelligence
      basePrice = 6999;
      freeChatLimit = 250;
      extraChatRate = 8;
      plan = "Super Intelligence";
    }

    // Calculate extra chat costs
    if (chatCount > freeChatLimit) {
      extraChats = chatCount - freeChatLimit;
      extraChatPrice = extraChats * extraChatRate;
    }

    // Calculate WhatsApp cost separately
    if (chatbotAddons.whatsapp) {
      whatsappCost = chatCount * 0.5;
    }

    // Determine usage level
    let usage = "normal";
    if (selectedChatbotPlan === "intelligence" && chatCount > 1000) {
      usage = "highIntelligence";
    } else if (
      selectedChatbotPlan === "super-intelligence" &&
      chatCount > 1000
    ) {
      usage = "highSuperIntelligence";
    }

    return {
      plan,
      basePrice,
      extraCost: extraChatPrice + whatsappCost,
      totalPrice: basePrice + extraChatPrice + whatsappCost,
      usage,
      tringAIPercentage: chatbotAddons.whatsapp
        ? Math.round((10 / 10.5) * 100)
        : 100,
      whatsappPercentage: chatbotAddons.whatsapp
        ? Math.round((0.5 / 10.5) * 100)
        : 0,
    };
  };

  // Calculate voicebot pricing
  const calculateVoicebotPrice = () => {
    let basePrice = 0;
    let extraMinutes = 0;
    let extraMinutePrice = 0;
    let addonsPrice = 0;
    let freeMinsLimit = 0;
    let extraMinRate = 0;

    // Set pricing parameters based on selected plan
    if (selectedVoicebotPlan === "fluent") {
      basePrice = 14999;
      freeMinsLimit = 1500;
      extraMinRate = 6;
    } else {
      // lucid
      basePrice = 39999;
      freeMinsLimit = 5000;
      extraMinRate = 8;
    }

    // Add costs for addons based on real-world pricing
    if (voicebotAddons.customVoice) {
      // ElevenLabs pricing - using Pro plan as baseline (₹8,250 at ₹83 per USD)
      // $99 for 500 mins = ~₹8,250
      if (minuteCount <= 500) {
        addonsPrice += 8250;
      }
      // Scale plan for higher usage (₹27,390 at ₹83 per USD)
      // $330 for 2000 mins = ~₹27,390
      else if (minuteCount <= 2000) {
        addonsPrice += 27390;
      }
      // Custom pricing for very high usage
      else {
        // Approximate rate of ₹13.7 per minute for Scale plan
        addonsPrice += Math.min(minuteCount * 13.7, 50000); // Cap at ₹50,000
      }
    }

    if (voicebotAddons.cloudTelephony) {
      // Plivo India pricing
      // Monthly cost: $3.13 (₹260 at ₹83 per USD)
      // Call rates: ₹0.40/min for both incoming and outgoing
      /* const monthlySubscription = 260;
    const perMinuteRate = 0.4; */
      const monthlySubscription = 0;
      const perMinuteRate = 0;

      addonsPrice += monthlySubscription + minuteCount * perMinuteRate;
    }

    if (voicebotAddons.multipleLanguages) {
      // Additional cost for supporting multiple languages
      // Approximately 20% premium on voice generation
      if (voicebotAddons.customVoice) {
        addonsPrice += addonsPrice * 0.2;
      } else {
        addonsPrice += 1500; // Base cost if no custom voice
      }
    }

    // Calculate extra minute costs
    if (minuteCount > freeMinsLimit) {
      extraMinutes = minuteCount - freeMinsLimit;
      extraMinutePrice = extraMinutes * extraMinRate;
    }

    // Calculate percentages based on addons and their real costs
    const tringAIBasePercentage = 40;
    let plivoPercentage = 0;
    let elevenLabsPercentage = 0;

    if (voicebotAddons.cloudTelephony) {
      // Plivo cost is relatively small per minute (₹0.40/min)
      const plivoCost = 260 + minuteCount * 0.4;
      const totalCost = basePrice + extraMinutePrice + addonsPrice;
      plivoPercentage = Math.round((plivoCost / totalCost) * 100);
      plivoPercentage = Math.min(plivoPercentage, 20); // Cap at 20%
    }

    if (voicebotAddons.customVoice) {
      // ElevenLabs is more expensive
      let elevenLabsCost = 0;
      if (minuteCount <= 500) {
        elevenLabsCost = 8250;
      } else if (minuteCount <= 2000) {
        elevenLabsCost = 27390;
      } else {
        elevenLabsCost = Math.min(minuteCount * 13.7, 50000);
      }

      const totalCost = basePrice + extraMinutePrice + addonsPrice;
      elevenLabsPercentage = Math.round((elevenLabsCost / totalCost) * 100);
      elevenLabsPercentage = Math.min(elevenLabsPercentage, 40); // Cap at 40%
    }

    // Adjust Tring AI percentage based on the other services
    const tringAIPercentage = 100 - plivoPercentage - elevenLabsPercentage;

    // Determine usage level
    let usage = "normal";
    if (minuteCount > 10000) {
      usage = "high";
    }

    return {
      plan: selectedVoicebotPlan === "fluent" ? "Fluent" : "Lucid",
      basePrice,
      extraCost: extraMinutePrice + addonsPrice,
      totalPrice: basePrice + extraMinutePrice + addonsPrice,
      usage,
      tringAIPercentage,
      plivoPercentage,
      elevenLabsPercentage,
      extraMinRate,
      freeMinsLimit,
    };
  };

  const chatbotPricing = calculateChatbotPrice();
  const voicebotPricing = calculateVoicebotPrice();

  // Calculate total price
  const calculateTotalPrice = () => {
    let total = 0;
    if (chatbotActive) {
      total += chatbotPricing.totalPrice;
    }
    if (voicebotActive) {
      total += voicebotPricing.totalPrice;
    }
    return total;
  };

  const totalPrice = calculateTotalPrice();

  const incrementChat = (amount = 50) => {
    setChatCount((prev) => prev + amount);
  };

  const decrementChat = (amount = 50) => {
    setChatCount((prev) => Math.max(0, prev - amount));
  };

  const incrementMinutes = (amount = 50) => {
    setMinuteCount((prev) => prev + amount);
  };

  const decrementMinutes = (amount = 50) => {
    setMinuteCount((prev) => Math.max(0, prev - amount));
  };

  const toggleChatbot = () => {
    setChatbotActive((prev) => !prev);
  };

  const toggleVoicebot = () => {
    setVoicebotActive((prev) => !prev);
  };

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (voicebotRef.current) {
      voicebotRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Set a specific plan and scroll to calculator
  const selectPlanAndScroll = (type, plan) => {
    if (type === "chatbot") {
      setChatbotActive(true);
      setVoicebotActive(false);
      setSelectedChatbotPlan(plan);
      // Set chat count based on plan
      if (plan === "intelligence") {
        setChatCount(60);
      } else if (plan === "super-intelligence") {
        setChatCount(250);
      }
    } else if (type === "voicebot") {
      setVoicebotActive(true);
      setChatbotActive(false);
      setSelectedVoicebotPlan(plan);
      // Set minute count based on plan
      if (plan === "fluent") {
        setMinuteCount(1500);
      } else if (plan === "lucid") {
        setMinuteCount(5000);
      }
    }

    // Scroll to calculator
    scrollToCalculator();
  };

  // Make the selectPlanAndScroll function available globally
  useEffect(() => {
    window.selectPlanAndScroll = selectPlanAndScroll;
  }, []);

  const FloatingPriceDisplay = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg md:hidden z-50 flex justify-between items-center">
        <div>
          <div className="text-lg font-bold">
            {formatPrice(convertPrice(totalPrice))}
            <span className="text-sm font-normal opacity-80">/month</span>
          </div>
          <div className="text-xs opacity-80">Total estimated cost</div>
        </div>
        <Button className="bg-[#FDB137] hover:bg-[#f0a52c] text-white">
          Start free trial
        </Button>
      </div>
    );
  };

  return (
    <section
      className="py-8 md:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28"
      ref={calculatorRef}
    >
      <div className="relative mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Estimate your{" "}
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
            monthly cost
          </span>
        </h2>
        <p className="text-gray-600 mb-8">
          Enter your estimated monthly usage, and we'll provide a plan that best
          suits your needs
        </p>
        {/* Mobile Price Summary */}
        <div className="md:hidden bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Current estimate:</div>
              <div className="text-xl font-bold text-blue-600">
                {formatPrice(convertPrice(totalPrice))}
                <span className="text-sm font-normal">/month</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {country === "IN" ? "₹ Indian Rupees" : "$ US Dollars"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chatbot Calculator */}
          {chatbotActive ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Chatbot</h3>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedChatbotPlan}
                    onChange={(e) => setSelectedChatbotPlan(e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="intelligence">Intelligence</option>
                    <option value="super-intelligence">
                      Super Intelligence
                    </option>
                  </select>
                  <Checkbox checked={true} onCheckedChange={toggleChatbot} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs mb-2">Number of chats</label>
                <div className="flex items-center border-2 px-2 rounded-md bg-gray-200">
                  <input
                    type="number"
                    value={chatCount}
                    onChange={(e) =>
                      setChatCount(Number.parseInt(e.target.value) || 0)
                    }
                    className="border-y bg-gray-200  p-2 text-center w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => decrementChat()}
                      className=" p-2 rounded-full bg-white text-blue-500"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => incrementChat()}
                      className="p-2 rounded-full bg-blue-500 text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 md:gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-medium mb-2">Basics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="lead-generation"
                        checked={chatbotAddons.leadGeneration}
                        onCheckedChange={(checked) =>
                          setChatbotAddons((prev) => ({
                            ...prev,
                            leadGeneration: !!checked,
                          }))
                        }
                      />
                      <label htmlFor="lead-generation" className="ml-2 text-xs">
                        Lead generation
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="crm-integration"
                        checked={chatbotAddons.crmIntegration}
                        onCheckedChange={(checked) =>
                          setChatbotAddons((prev) => ({
                            ...prev,
                            crmIntegration: !!checked,
                          }))
                        }
                      />
                      <label htmlFor="crm-integration" className="ml-2 text-xs">
                        CRM integration
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium mb-2">Addons</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="ai-whatsapp"
                        checked={chatbotAddons.whatsapp}
                        onCheckedChange={(checked) =>
                          setChatbotAddons((prev) => ({
                            ...prev,
                            whatsapp: !!checked,
                          }))
                        }
                      />
                      <label htmlFor="ai-whatsapp" className="ml-2 text-xs">
                        AI on WhatsApp
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="no-branding-chat"
                        checked={chatbotAddons.noTringBranding}
                        onCheckedChange={(checked) =>
                          setChatbotAddons((prev) => ({
                            ...prev,
                            noTringBranding: !!checked,
                          }))
                        }
                      />
                      <label
                        htmlFor="no-branding-chat"
                        className="ml-2 text-xs"
                      >
                        No Tring AI branding
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-auto">
                <h3 className="font-medium mb-2">AI Chat + WhatsApp</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-200 w-auto font-bold text-blue-700 text-sm p-3 rounded">
                      Tring AI
                      <div className="text-xs text-gray-500">Chatbot</div>
                    </div>
                    {chatbotAddons.whatsapp && (
                      <div className="bg-slate-200 text-blue-700 font-bold w-auto text-sm p-3 rounded">
                        Meta
                        <div className="text-xs text-gray-500">
                          WhatsApp Business API
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {formatPrice(
                    convertPrice(chatbotAddons.whatsapp ? 10.5 : 10)
                  )}
                  /chat
                </div>

                <div className="mt-4 h-10 bg-gray-200 rounded-md overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${chatbotPricing.tringAIPercentage}%` }}
                    ></div>
                    {chatbotAddons.whatsapp && (
                      <div
                        className="bg-green-600 h-full"
                        style={{
                          width: `${chatbotPricing.whatsappPercentage}%`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="flex text-xs mt-1">
                  <div className="flex items-center mr-4 ">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
                    <span>Tring AI</span>
                  </div>
                  {chatbotAddons.whatsapp && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
                      <span>Meta</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <h2 className="text-sm no-underline text-yellow-500 font-medium mb-2">
                          Pricing breakdown
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between">
                          <span>
                            Base price (
                            {selectedChatbotPlan === "intelligence"
                              ? "Intelligence"
                              : "Super Intelligence"}
                            ):
                          </span>
                          <span>
                            {formatPrice(
                              convertPrice(chatbotPricing.basePrice)
                            )}
                          </span>
                        </div>
                        {chatCount >
                          (selectedChatbotPlan === "intelligence"
                            ? 60
                            : 250) && (
                          <div className="flex justify-between">
                            <span>
                              Extra chats (
                              {chatCount -
                                (selectedChatbotPlan === "intelligence"
                                  ? 60
                                  : 250)}{" "}
                              ×{" "}
                              {formatPrice(
                                convertPrice(
                                  selectedChatbotPlan === "intelligence"
                                    ? 10
                                    : 8
                                )
                              )}
                              /chat):
                            </span>
                            <span>
                              {formatPrice(
                                convertPrice(
                                  (chatCount -
                                    (selectedChatbotPlan === "intelligence"
                                      ? 60
                                      : 250)) *
                                    (selectedChatbotPlan === "intelligence"
                                      ? 10
                                      : 8)
                                )
                              )}
                            </span>
                          </div>
                        )}

                        {/* Add-ons breakdown */}
                        {chatbotAddons.whatsapp && (
                          <div className="flex justify-between">
                            <span>
                              WhatsApp integration ({chatCount} chats ×{" "}
                              {formatPrice(convertPrice(0.5))}/chat):
                            </span>
                            <span>
                              {formatPrice(convertPrice(chatCount * 0.5))}
                            </span>
                          </div>
                        )}

                        {chatbotAddons.noTringBranding && (
                          <div className="flex justify-between">
                            <span>No Tring AI branding:</span>
                            <span>{formatPrice(convertPrice(499))}</span>
                          </div>
                        )}

                        <div className="flex justify-between font-medium mt-1 pt-1 border-t border-gray-200">
                          <span>Total:</span>
                          <span>
                            {formatPrice(
                              convertPrice(chatbotPricing.totalPrice)
                            )}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Extra chats breakdown */}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-yellow-50 to-pink-50 p-6 rounded-lg shadow-sm border w-full">
              <div className="flex flex-col gap-6">
                <div className="md:w-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Smart Chatbot for{" "}
                    <span className="text-blue-600">Instant Engagement</span>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Let your voicebot handle incoming calls, then seamlessly
                    transfer queries or follow-ups to the Chatbot for instant
                    responses and continued assistance 24/7
                  </p>

                  <Button
                    onClick={() => setChatbotActive(true)}
                    className="bg-white border border-orange-300 text-orange-500 hover:bg-orange-50 flex items-center gap-2 w-full justify-center"
                  >
                    <Plus size={16} />
                    Add Chatbot
                  </Button>
                </div>

                <div className="md:w-full flex justify-center">
                  <div className="relative w-full ">
                    <img
                      src="/arrow.png"
                      alt=""
                      height={50}
                      width={50}
                      className="absolute top-0 left-44"
                    />

                    <img
                      src="/chat.png"
                      alt="Chatbot Interface"
                      width={700}
                      height={600}
                      className="rounded-lg mt-16"
                    />
                    <div className="absolute -bottom-4 -right-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V12L16 14"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#4F46E5"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Voicebot Calculator */}
          {!voicebotActive && (
            <div
              className="bg-gradient-to-br from-yellow-50 to-pink-50 p-6 rounded-lg shadow-sm border w-full"
              ref={voicebotRef}
            >
              <div className="flex flex-col gap-6">
                <div className="md:w-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    AI Voice for{" "}
                    <span className="text-blue-600">Instant Engagement</span>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enhance your chatbot with a voicebot to handle calls, answer
                    queries, and engage customers through natural human-like
                    conversations
                  </p>

                  <div className="flex justify-center">
                    <Button
                      onClick={() => setVoicebotActive(true)}
                      className="bg-white border border-orange-300 text-orange-500 hover:bg-orange-50 flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Voicebot
                    </Button>
                  </div>
                </div>

                <div className="md:w-full flex justify-center">
                  <div className="relative w-full ">
                    <img
                      src="/arrow.png"
                      alt=""
                      height={50}
                      width={50}
                      className="absolute top-0 left-44"
                    />

                    <img
                      src="/voice.png"
                      alt="Voicebot Interface"
                      width={600}
                      height={600}
                      className="rounded-lg w-full mt-20  "
                    />
                    <div className="absolute -bottom-4 -right-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 6V12L16 14"
                            stroke="#4F46E5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#4F46E5"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {voicebotActive && (
            <div className="bg-white p-6 rounded-lg shadow-sm h-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Voicebot</h3>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedVoicebotPlan}
                    onChange={(e) => setSelectedVoicebotPlan(e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="fluent">Fluent</option>
                    <option value="lucid">Lucid</option>
                  </select>
                  <Checkbox checked={true} onCheckedChange={toggleVoicebot} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs mb-2">Number of minutes</label>
                <div className="flex items-center border-2 px-2  rounded-md bg-gray-200">
                  <input
                    type="number"
                    value={minuteCount}
                    onChange={(e) =>
                      setMinuteCount(Number.parseInt(e.target.value) || 0)
                    }
                    className="border-y bg-gray-200  p-2 text-center w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => decrementMinutes()}
                      className=" p-2 rounded-full bg-white text-blue-500"
                    >
                      <Minus size={16} />
                    </button>
                    <button
                      onClick={() => incrementMinutes()}
                      className="p-2 rounded-full bg-blue-500 text-white"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 xs:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div>
                  <h4 className="text-xs font-medium mb-2">Basics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="multiple-languages"
                        checked={voicebotAddons.multipleLanguages}
                        onCheckedChange={(checked) =>
                          setVoicebotAddons((prev) => ({
                            ...prev,
                            multipleLanguages: !!checked,
                          }))
                        }
                      />
                      <label
                        htmlFor="multiple-languages"
                        className="ml-2 text-xs"
                      >
                        Multiple languages
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="cloud-telephony"
                        checked={voicebotAddons.cloudTelephony}
                        onCheckedChange={(checked) =>
                          setVoicebotAddons((prev) => ({
                            ...prev,
                            cloudTelephony: !!checked,
                          }))
                        }
                      />
                      <label htmlFor="cloud-telephony" className="ml-2 text-xs">
                        Cloud telephony
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-medium mb-2">Addons</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="custom-voice"
                        checked={voicebotAddons.customVoice}
                        onCheckedChange={(checked) =>
                          setVoicebotAddons((prev) => ({
                            ...prev,
                            customVoice: !!checked,
                          }))
                        }
                      />
                      <label htmlFor="custom-voice" className="ml-2 text-xs">
                        Custom voice
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="no-branding-voice"
                        checked={voicebotAddons.noTringBranding}
                        onCheckedChange={(checked) =>
                          setVoicebotAddons((prev) => ({
                            ...prev,
                            noTringBranding: !!checked,
                          }))
                        }
                      />
                      <label
                        htmlFor="no-branding-voice"
                        className="ml-2 text-xs"
                      >
                        No Tring AI branding
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">AI Call + Custom Voice</h3>

                <div className="flex items-center gap-4">
                  <div className="bg-slate-200 w-auto font-bold text-blue-700 text-sm p-3 rounded">
                    Tring AI
                    <div className="text-xs text-gray-500">Voicebot</div>
                  </div>
                  {voicebotAddons.cloudTelephony && (
                    <div className="bg-slate-200 text-blue-700 font-bold w-auto text-sm p-3 rounded">
                      Plivo
                      <div className="text-xs text-gray-500">Telephony</div>
                    </div>
                  )}
                  {voicebotAddons.customVoice && (
                    <div className="bg-slate-200 text-blue-700 font-bold w-auto text-sm p-3 rounded">
                      ElevenLabs
                      <div className="text-xs text-gray-500">Custom voice</div>
                    </div>
                  )}
                </div>

                <div className="text-xl font-bold mt-6">
                  ₹{voicebotPricing.extraMinRate}/minute
                </div>
                {/*  <div className="text-xs text-gray-500 mt-1">
                  {voicebotPricing.freeMinsLimit} free minutes included
                </div> */}

                <div className="mt-4 h-10 bg-gray-200 rounded-md overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${voicebotPricing.tringAIPercentage}%` }}
                    ></div>
                    {voicebotAddons.cloudTelephony && (
                      <div
                        className="bg-blue-400 h-full"
                        style={{ width: `${voicebotPricing.plivoPercentage}%` }}
                      ></div>
                    )}
                    {voicebotAddons.customVoice && (
                      <div
                        className="bg-orange-500 h-full"
                        style={{
                          width: `${voicebotPricing.elevenLabsPercentage}%`,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div className="flex text-xs mt-1 flex-wrap">
                  <div className="flex items-center mr-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
                    <span>Tring AI</span>
                  </div>
                  {voicebotAddons.cloudTelephony && (
                    <div className="flex items-center mr-4">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                      <span>Plivo</span>
                    </div>
                  )}
                  {voicebotAddons.customVoice && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                      <span>ElevenLabs</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <h2 className="text-sm text-yellow-500 font-medium mb-2">
                          Pricing breakdown
                        </h2>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between">
                          <span>Base price ({voicebotPricing.plan}):</span>
                          <span>
                            {formatPrice(
                              convertPrice(voicebotPricing.basePrice)
                            )}
                          </span>
                        </div>

                        {/* Extra minutes breakdown */}
                        {minuteCount > voicebotPricing.freeMinsLimit && (
                          <div className="flex justify-between">
                            <span>
                              Extra minutes (
                              {minuteCount - voicebotPricing.freeMinsLimit} ×{" "}
                              {formatPrice(
                                convertPrice(voicebotPricing.extraMinRate)
                              )}
                              /min):
                            </span>
                            <span>
                              {formatPrice(
                                convertPrice(
                                  (minuteCount -
                                    voicebotPricing.freeMinsLimit) *
                                    voicebotPricing.extraMinRate
                                )
                              )}
                            </span>
                          </div>
                        )}

                        {/* Add-ons breakdown */}
                        {voicebotAddons.customVoice && (
                          <div className="flex justify-between">
                            <span>Custom voice:</span>
                            <span>
                              {minuteCount <= 500
                                ? formatPrice(convertPrice(8250))
                                : minuteCount <= 2000
                                ? formatPrice(convertPrice(27390))
                                : formatPrice(
                                    convertPrice(
                                      Math.min(minuteCount * 13.7, 50000)
                                    )
                                  )}
                            </span>
                          </div>
                        )}

                        {voicebotAddons.cloudTelephony && (
                          <div className="flex justify-between">
                            <span>Cloud telephony:</span>
                            <span>
                              {/* {formatPrice(
                                convertPrice(260 + minuteCount * 0.4)
                              )} */}
                              0
                            </span>
                          </div>
                        )}

                        {voicebotAddons.multipleLanguages && (
                          <div className="flex justify-between">
                            <span>Multiple languages:</span>
                            <span>
                              {formatPrice(
                                convertPrice(
                                  voicebotAddons.customVoice
                                    ? minuteCount <= 500
                                      ? 8250 * 0.2
                                      : minuteCount <= 2000
                                      ? 27390 * 0.2
                                      : Math.min(minuteCount * 13.7, 50000) *
                                        0.2
                                    : 1500
                                )
                              )}
                            </span>
                          </div>
                        )}

                        {voicebotAddons.noTringBranding && (
                          <div className="flex justify-between">
                            <span>No Tring AI branding:</span>
                            <span>{formatPrice(convertPrice(999))}</span>
                          </div>
                        )}

                        <div className="flex justify-between font-medium mt-1 pt-1 border-t border-gray-200">
                          <span>Total:</span>
                          <span>
                            {formatPrice(
                              convertPrice(voicebotPricing.totalPrice)
                            )}
                          </span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Package Summary */}
        <div className="bg-blue-600 mb-10 text-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-xs ${
                  billingPeriod === "monthly" ? "text-white" : "text-white/60"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={billingPeriod === "yearly"}
                onCheckedChange={(checked) =>
                  setBillingPeriod(checked ? "yearly" : "monthly")
                }
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/40"
              />
              <span
                className={`text-xs ${
                  billingPeriod === "yearly" ? "text-white" : "text-white/60"
                }`}
              >
                Yearly
              </span>
            </div>
          </div>

          {voicebotActive && !chatbotActive && (
            <div>
              <div className="border-[2px] border-spacing-10 border-white border-dashed border-white/40 rounded-lg p-4 my-4 flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-2xl font-bold mb-1">
                  {voicebotPricing.plan}
                </h2>
                {/* <p className="text-xs opacity-80 mb-4">plus addons</p>
                <div className="text-3xl font-bold mb-6">
                  {" "}
                  {formatPrice(convertPrice(voicebotPricing.totalPrice))}
                  <span className="text-xs font-normal opacity-80">/month</span>
                </div> */}
                {voicebotPricing.usage === "high" ? (
                  <div className="bg-white text-yellow-400 text-xl font-bold p-3 rounded-md mb-6">
                    <p className="text-sm">Contact Sales</p>
                  </div>
                ) : (
                  <div className="text-3xl font-bold mb-6">
                    {formatPrice(convertPrice(voicebotPricing.totalPrice))}{" "}
                    <span className="text-xs font-normal opacity-80">
                      /month
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold">+</span>
              </div>

              <div
                className="border-[2px] border-spacing-10 border-white border-dashed border-white/40 rounded-lg p-4 my-4 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setChatbotActive(true)}
              >
                <div className="bg-white/10 rounded-full p-2 mb-2">
                  <Plus size={20} className="text-yellow-300" />
                </div>
                <span className="text-yellow-300 font-medium">Add Chatbot</span>
              </div>

              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="text-3xl font-bold mb-1">
                  {formatPrice(convertPrice(voicebotPricing.totalPrice))}
                  <span className="text-xs font-normal opacity-80">/month</span>
                </div>
                <p className="text-xs opacity-80 mb-4">
                  does not include applicable taxes
                </p>
                <button className="text-xs underline">Share this price</button>
              </div>

              <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white mt-6">
                Start free trial
              </Button>
            </div>
          )}

          {chatbotActive && !voicebotActive && (
            <div>
              <div className="border-[2px] border-spacing-10 border-white border-dashed border-white/40 rounded-lg p-4 my-4 flex flex-col items-center justify-center cursor-pointer">
                <h2 className="text-2xl font-bold mb-1">
                  {chatbotPricing.plan}
                </h2>
                <p className="text-xs opacity-80 mb-4">plus addons</p>

                {chatbotPricing.usage === "highIntelligence" ? (
                  <div className="bg-white text-yellow-400 text-xl font-bold p-3 rounded-md mb-6">
                    <p className="text-xs">Contact Sales</p>
                  </div>
                ) : (
                  <div className="text-3xl font-bold mb-6">
                    {formatPrice(convertPrice(chatbotPricing.totalPrice))}{" "}
                    <span className="text-xs font-normal opacity-80">
                      /month
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <span className="text-2xl font-bold">+</span>
              </div>

              <div
                className="border-[2px] border-spacing-10 border-white border-dashed border-white/40 rounded-lg p-4 my-4 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setVoicebotActive(true)}
              >
                <div className="bg-white/10 rounded-full p-2 mb-2">
                  <Plus size={20} className="text-yellow-300" />
                </div>
                <span className="text-yellow-300 font-medium">
                  Add Voicebot
                </span>
              </div>

              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="text-3xl font-bold mb-1">
                  {formatPrice(convertPrice(chatbotPricing.totalPrice))}{" "}
                  <span className="text-xs font-normal opacity-80">/month</span>
                </div>
                <p className="text-xs opacity-80 mb-4">
                  does not include applicable taxes
                </p>
                <button className="text-xs underline">Share this price</button>
              </div>

              <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white mt-6">
                Start free trial
              </Button>
            </div>
          )}

          {chatbotActive && voicebotActive && (
            <>
              <h2 className="text-center text-xl font-bold mb-1">
                Your Custom Package
              </h2>
              <div className="space-y-4 flex flex-col justify-center items-center mb-6 p-2">
                <div className="w-full border-[2px] border-spacing-10 border-white border-dashed bg-slate-100 bg-opacity-20 border-white/40 rounded-lg p-3  flex flex-col items-center justify-center cursor-pointer">
                  <span className="text-xl text-clip font-bold text-orange-400">
                    {chatbotPricing.plan}
                  </span>
                  <span className="text-lg opacity-80">plus add-ons</span>

                  <span>
                    {chatbotPricing.usage === "highIntelligence" ? (
                      <div className="mt-2 bg-white text-yellow-400 text-xl font-bold p-3 rounded-md mb-6">
                        <p className="text-xs">Contact Sales</p>
                      </div>
                    ) : (
                      <div className="flex-col text-2xl font-bold mb-6">
                        {formatPrice(convertPrice(chatbotPricing.totalPrice))}{" "}
                        <span className="text-xs font-normal opacity-80">
                          /month
                        </span>
                      </div>
                    )}
                  </span>
                </div>
                <span className="text-xl font-bold">+</span>
                <div className="w-full border-[2px] border-spacing-10 border-dashed border-white bg-slate-100 bg-opacity-20 border-white/40 rounded-lg p-3  flex flex-col items-center justify-center cursor-pointer">
                  <span className="text-2xl text-clip font-bold text-orange-400">
                    {voicebotPricing.plan}{" "}
                  </span>
                  <span className="text-lg">plus add-ons</span>
                  <span>
                    {voicebotPricing.usage === "high" ? (
                      <div className="mt-2 bg-white text-yellow-400 text-xl font-bold p-3 rounded-md mb-6">
                        <p className="text-sm">Contact Sales</p>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold">
                        {formatPrice(convertPrice(voicebotPricing.totalPrice))}
                        <span className="text-sm font-normal text-white">
                          / month
                        </span>
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className=" text-center text-4xl font-bold mb-1">
                  {formatPrice(convertPrice(totalPrice))}{" "}
                  <span className="text-xl font-bold opacity-80">/month</span>
                </div>
                <p className="text-center text-xs opacity-80 mb-2">
                  does not include applicable taxes
                </p>
                <div className="flex justify-center">
                  <button className="text-xs underline text-orange-300 text-center">
                    Share this price
                  </button>
                </div>
              </div>
              <Button className="w-full bg-[#FDB137] hover:bg-[#f0a52c] text-white mt-6">
                Start free trial
              </Button>
            </>
          )}
        </div>
      </div>
      <FloatingPriceDisplay />
    </section>
  );
}
