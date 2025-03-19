"use client";

export default function HeroSection() {
  return (
    <section className="py-16 text-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-20">
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
