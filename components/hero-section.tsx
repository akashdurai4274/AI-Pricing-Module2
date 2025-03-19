"use client";

import Star from "./Star";

export default function HeroSection() {
  return (
    <section className="py-16 text-center relative">
      {/*  <div className="absolute top-[-110px] left-[0px] right-0 flex justify-center items-center  ">
        <img src="/border.png" alt="border" className="bw-[38%] h-full " />
      </div> */}

      <div className="max-w-4xl mx-auto ">
        <Star />
        <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-6 leading-normal">
          Designed for your business{" "}
          <span className="py-1 w-2 bg-blue-700 rounded-l-sm text-blue-700">
            |
          </span>
          <span className="bg-blue-100 bg-opacity-60  text-blue-700 px-2 py-1  rounded">
            Priced to fit your budget
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Choose from affordable pricing plans tailored to suit your needs
        </p>
      </div>
    </section>
  );
}
