"use client";

import React from "react";
import "./home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div id="home-container">
      <div id="header-container">
        <Image src="/logo.jpg" alt="" width={130} height={100} />
        <button
          className="signout-button"
          onClick={() => {
            router.push("/auth");
          }}
        >
          Sign Out
        </button>
      </div>
      <div id="difficulty-container">
        <h1>Select Your Difficulty Level</h1>
        <button
          className="difficulty-button"
          onClick={() => {
            router.push(`/quizz?type=easy`);
          }}
        >
          Easy
        </button>
        <button
          className="difficulty-button"
          onClick={() => {
            router.push("/quizz?type=medium");
          }}
        >
          Medium
        </button>
        <button
          className="difficulty-button"
          onClick={() => {
            router.push("/quizz?type=hard");
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default page;
