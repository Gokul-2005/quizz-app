"use client";

import React, { useState } from "react";
import "./auth.css";
import { useRouter } from "next/navigation";
function page() {
  const [authType, setAuthType] = useState("signin");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const setAuthTypeVal = () => {
    if (authType == "signin") {
      setAuthType("signup");
    } else {
      setAuthType("signin");
    }
  };

  const AuthenticationCheck = () => {
    let isUserExist = false;
    if (
      authType == "signup" &&
      credentials.name != "" &&
      credentials.email != "" &&
      credentials.password != ""
    ) {
      let localStorageData = localStorage.getItem("usersList");
      if (
        localStorageData != null &&
        localStorageData != "" &&
        JSON.parse(localStorageData).length > 0
      ) {
        let parsedData = JSON.parse(localStorageData);
        for (const user of parsedData) {
          if (
            user.email == credentials.email &&
            user.password == credentials.password
          ) {
            isUserExist = true;
          }
        }
        if (isUserExist) {
          alert("User Already Exist, Please Sign In");
        } else {
          localStorage.setItem(
            "usersList",
            JSON.stringify([...JSON.parse(localStorageData), credentials])
          );
          router.push("/home");
        }
      }
      if (localStorageData == null || localStorageData == "") {
        localStorage.setItem("usersList", JSON.stringify([credentials]));
        router.push("/home");
      }
    } else if (
      authType == "signin" &&
      credentials.email != "" &&
      credentials.password != ""
    ) {
      let localStorageData = localStorage.getItem("usersList");
      console.log(JSON.parse(localStorageData));
      if (
        localStorageData != null &&
        localStorageData != "" &&
        JSON.parse(localStorageData).length > 0
      ) {
        let parsedData = JSON.parse(localStorageData);
        for (const user of parsedData) {
          if (
            user.email == credentials.email &&
            user.password == credentials.password
          ) {
            isUserExist = true;
          }
        }
        if (isUserExist) {
          router.push("/home");
        } else {
          alert("No User Found, Please Create A New Account");
        }
      }
      if (localStorageData == null) {
        alert("No User Found, Please Create A New Account");
      }
    } else {
      alert("Kindly Enter Required Fields");
    }
  };

  return (
    <div id="authContainer">
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">
                {" "}
                {authType == "signin" ? "Sign In" : "Sign Up"}{" "}
              </h2>
              <div className="register-form" id="register-form">
                {authType == "signup" ? (
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      value={credentials.name}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={credentials.email}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => {
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value={authType == "signup" ? "Register" : "Enter Contest"}
                    onClick={() => {
                      AuthenticationCheck();
                    }}
                  />
                </div>
                <button
                  href="#"
                  className="signup-image-link"
                  onClick={() => {
                    setAuthTypeVal();
                  }}
                >
                  {authType == "signup"
                    ? "I am already a member"
                    : "Create New Account"}
                </button>
              </div>
            </div>
            <div className="signup-image">
              <figure>
                <img src="/signup-image.jpg" alt="sing up image" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
