"use client";

export default function HeroSection() {
  return (
    <section className="py-16 text-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-20">
          <div className="text-blue-600">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 20L15 15M15 15L20 10M15 15L10 10M15 15L20 20"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Designed for your business <span>Priced to fit your budget</span>
          {/* className="bg-blue-100 text-blue-600 px-2 py-1 rounded" */}
        </h1>
        <p className="text-lg text-gray-600">
          Choose from affordable pricing plans tailored to suit your needs
        </p>
      </div>
    </section>
  );
}
