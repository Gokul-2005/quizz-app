"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./quizz.css";

const page = () => {
  const [questions, setQuestions] = useState("");
  const [currQuestion, setCurrQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const elementRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    getChatGptResp();
  }, []);

  useEffect(() => {
    setCurrQuestion(questions[questionNumber]);
  }, [questionNumber]);

  const getChatGptResp = async () => {
    const res = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=ijKyiVhs40l2RUBOQ1biTJRUaD8Ichn1Hm665yJi&difficulty=${searchParams.get(
        "type"
      )}&limit=15`
    );
    const data = await res.json();
    console.log(data);
    let questionArray = [];
    for (const ele of data) {
      let question = ele["question"];
      let answerArray = [];
      for (const ele1 of Object.values(ele["answers"])) {
        if (ele1 != null && ele1 != "") {
          answerArray.push(ele1);
        }
      }
      let correctAnswer = "";
      Object.values(ele["correct_answers"]).forEach((element, index) => {
        if (element == "true") {
          correctAnswer = index + 1;
        }
      });
      let questionObj = {
        question: question,
        answers: answerArray,
        correctAnswer: correctAnswer,
        answered: false,
      };
      questionArray.push(questionObj);
    }
    console.log(questionArray);
    setQuestions(questionArray);
    setCurrQuestion(questionArray[0]);
  };

  const checkAnswer = (index, e) => {
    if (!currQuestion["answered"]) {
      setCurrQuestion({ ...currQuestion, answered: true });
      if (currQuestion["correctAnswer"] == index) {
        setCorrectAnswerCount(correctAnswerCount + 1);

        e.target.className = "correct-answer";
      }
      if (currQuestion["correctAnswer"] != index) {
        e.target.className = "wrong-answer";
        let parentElement = e.target.parentElement;
        parentElement.children[currQuestion["correctAnswer"] - 1].className =
          "correct-answer";
      }
    }
  };

  return (
    <div id="quizz-container">
      <div id="header-container">
        <Image src="/logo.jpg" alt="" width={130} height={100} />
        <button
          className="signout-button"
          onClick={() => {
            router.push("/home");
          }}
        >
          Home
        </button>
      </div>
      {currQuestion != null && currQuestion != "" ? (
        <div id="question-container">
          <div id="questionCountBox">Questions : {questionNumber + 1}/15</div>
          <div id="questionBox">Question : {currQuestion.question}</div>
          <div id="answerBox" ref={elementRef}>
            {currQuestion.answers.map((element, index) => {
              return (
                <button
                  className="answerButton"
                  onClick={(e) => {
                    checkAnswer(index + 1, e);
                  }}
                >
                  {" "}
                  {element}{" "}
                </button>
              );
            })}
          </div>
          <div id="footer-container">
            {questionNumber < 14 ? (
              <button
                className="signout-button"
                onClick={() => {
                  let parentElement = elementRef.current;
                  for (const child of parentElement.children) {
                    child.className = "answerButton";
                  }
                  setQuestionNumber(questionNumber + 1);
                }}
              >
                Next
              </button>
            ) : questionNumber == 14 ? (
              <button
                className="signout-button"
                onClick={() => {
                  router.push(`/result?mark=${correctAnswerCount}`);
                }}
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default page;
