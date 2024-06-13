"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./result.css";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div id="result-container">
      <div id="header-container">
        <Image src="/logo.jpg" alt="" width={130} height={100} />
        <button
          className="home-button"
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </button>
      </div>
      <div id="resultBox">
        <div id="resultHeader">Result</div>
        <div id="unAnsweredValue">
          {" "}
          Your Incorrect Questions : {15 - searchParams.get("mark")}{" "}
        </div>
        <div id="resultValue">Your Result : {searchParams.get("mark")}</div>
        {searchParams.get("mark") >= 10 ? (
          <dotlottie-player
            src="https://lottie.host/ab4a5d2d-2bfb-4584-b82e-55e877307e1b/Euo0Ct6MJq.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px", "margin-top": "10px" }}
            loop
            autoplay
          ></dotlottie-player>
        ) : (
          ""
        )}
        {searchParams.get("mark") < 10 ? (
          <dotlottie-player
            src="https://lottie.host/fba1a79b-8bdf-4226-960c-4bd2418edfe0/Feepum3Wh4.json"
            background="transparent"
            speed="0.5"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></dotlottie-player>
        ) : (
          ""
        )}
        <button
          className="try-button"
          onClick={() => {
            router.push("/home");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default page;
