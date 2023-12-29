import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../media/logo.png"

import "../Login/Login.css";
import Navigate from "../../Componenet/ComNav/CommonNavigate";
function Login() {
  let history = useNavigate();
  const Email = useRef();
  const password = useRef();
  const [valid, setvalid] = useState("True");
  function EmailValid() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(Email.current.value);
    setvalid("Must enter a valid email");
    return isValid;
  }

  ///ban or not
  const banPlayer = async () => {
    try {
      const ban = await fetch("http://localhost:3000/player/Ban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email.current.value,
        }),
      });
      if (!ban.ok) {
        throw new Error(`HTTP error! Status: ${ban.status}`);
      } else {
        const banplayer = await ban.json();
        if (banplayer === 1)
          setvalid("Your Are Ban cannot Login untill be un banned");
        else {
          console.log(banplayer);
          window.localStorage.setItem("Role", "Player");
          window.localStorage.setItem(
            "Email",
            JSON.stringify(Email.current.value)
          );
          history("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////banreator

  const banCreator = async () => {
    try {
      const ban = await fetch("http://localhost:3000/creator/Ban", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: Email.current.value,
        }),
      });
      if (!ban.ok) {
        throw new Error(`HTTP error! Status: ${ban.status}`);
      } else {
        const banplayer = await ban.json();
        if (banplayer === 1)
          setvalid("Your Are Ban cannot Login untill be un banned");
        else {
          console.log(banplayer);
          window.localStorage.setItem("Role", "Creator");
          window.localStorage.setItem(
            "Email",
            JSON.stringify(Email.current.value)
          );
          history("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //////Valid the email format
  const AdminValid = async () => {
    const isValid = EmailValid();

    if (isValid === true) {
      if (password.current.value.length === 0) setvalid("Enter Your password");
      else {
        setvalid("True");

        try {
          const result = await fetch("http://localhost:3000/admin/Login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: Email.current.value,
              Password: password.current.value,
            }),
          });

          if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }

          const responseData = await result.json();
          if (responseData.length === 0)
            setvalid("Enter a correct email and password  ");
          else {
            window.localStorage.setItem("Role", "Admin");
            window.localStorage.setItem(
              "Email",
              JSON.stringify(Email.current.value)
            );
            console.log(
              localStorage.getItem("Role"),
              localStorage.getItem("Email")
            );
            history("/");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////////
  const CreatorValid = async () => {
    const isValid = EmailValid();

    if (isValid === true) {
      if (password.current.value.length === 0) setvalid("Enter Your password");
      else {
        setvalid("True");

        try {
          const result = await fetch("http://localhost:3000/creator/Login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: Email.current.value,
              Password: password.current.value,
            }),
          });

          if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }

          const responseData = await result.json();
          if (responseData.length === 0)
            setvalid("Enter a correct email and password  ");
          else {
            banCreator();
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  //////////////////////////////////////////////
  const PlayerValid = async () => {
    const isValid = EmailValid();

    if (isValid === true) {
      if (password.current.value.length === 0) setvalid("Enter Your password");
      else {
        setvalid("True");

        try {
          const result = await fetch("http://localhost:3000/player/Login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: Email.current.value,
              Password: password.current.value,
            }),
          });

          if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
          }

          const responseData = await result.json();
          if (responseData.length === 0)
            setvalid("Enter a correct email and password  ");
          else {
            banPlayer();
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  return (
    <div className="LoginSignPage">
      <div>
        <div>
          <img src={LOGO} className="Loginlogo" />
        </div>
        <h1 className="LoginHeader">LOGIN</h1>
        <div className="EnterText">
          {/*<label>Enter your Email</label>*/}
          <input
            type="email"
            className="LoginSignupText"
            placeholder="Enter Email"
            ref={Email}
            maxLength={50}
            required
          />
        </div>
        <div className="EnterText">
          {/* <label>Enter your Password</label>*/}
          <input
            type="password"
            className="LoginSignupText"
            placeholder="Enter Password"
            ref={password}
            maxLength={20}
            required
          />
        </div>
        <h1 className="AsRole">AS</h1>
        <div className="LoginSignAs">
          <button className="LoginSignAsRole" onClick={AdminValid}>
            Admin
          </button>
          <button className="LoginSignAsRole" onClick={CreatorValid}>
            Creator
          </button>
          <button className="LoginSignAsRole" onClick={PlayerValid}>
            Player
          </button>
        </div>
        {valid !== "True" ? <p className="ErrorMessage">{valid}</p> : null}
      </div>
    </div>
  );
}
export default Login;
