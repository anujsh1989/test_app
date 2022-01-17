import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteNames from "../router/routernames";
import "./login.css";

//https://www.appsloveworld.com/sample-rest-api-url-for-testing-with-authentication/
export default function Login() {
  const navigate = useNavigate();
  const doSendData = () => {
    const dataToSend = {
      email: email.email,
      password: pwd.pwd,
    };

    axios
      .post("http://restapi.adequateshop.com/api/authaccount/login", dataToSend)
      .then((resp) => {
        if (resp.status === 200) {
          alert(resp.data.message);
          //   alert("Success");
          localStorage.setItem("id", resp.data.$id);
          localStorage.setItem("Authorization", resp.data.data.Token);
          //   console.log("resp is", resp);
          navigate(RouteNames.USER_LIST);
        }
      })
      .catch((err) => {
        console.log("error is", err);
      });
  };
  const onLoginClick = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.email)) {
    } else {
      alert("Please Enter Correct Mail ID");
      return;
    }
    if (pwd.pwd.trim().length >= 8) {
    } else {
      alert("Incorrect Password");
    }
    doSendData();
  };
  const [email, setEmail] = useState({
    email: "",
    emailerrtext: "",
  });
  const [pwd, setPwd] = useState({
    pwd: "",
    pwderrtext: "",
  });
  useEffect(() => {
    if (localStorage?.id) {
      navigate(RouteNames.USER_LIST);
    }
  }, [navigate]);
  return (
    <div className="login-wrapper">
      <div className="left">
        {/* <div
          className="left-logo-box"
          onClick={() => {
            alert("Logo Image");
          }}
        >
          <img src="./logo512.png" alt="logo" />
        </div> */}
        <img src="./Background.jpg" alt="bg"></img>
      </div>
      <div className="right">
        <img className="logo-img" src="./63011.jpg" alt="bg"></img>
        <div className="right-input-box">
          {/* <p className="signin-para">Sign In</p> */}
          <input
            className="email-input"
            placeholder="E-Mail"
            type="text"
            onChange={(e) =>
              setEmail({
                ...email,
                ...{
                  email: e.target.value,
                },
              })
            }
          ></input>
          <p className="error-para"></p>
          <input
            className="pwd-input"
            placeholder="Password"
            type="password"
            onChange={(e) =>
              setPwd({
                ...pwd,
                ...{
                  pwd: e.target.value,
                },
              })
            }
          ></input>
          <p className="error-para"></p>
          <button className="login-btn" onClick={() => onLoginClick()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
