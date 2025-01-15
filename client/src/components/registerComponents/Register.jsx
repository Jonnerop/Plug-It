import React, { useState } from "react";
import google from "../../assets/images/google_logo.png";
import register from "../../assets/images/registration_page.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../routes/AuthProvider";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleRegistration = () => {
    if (!username || !email || !confirmEmail || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (email !== confirmEmail) {
      setMessage("Emails do not match.");
      return;
    }
    if (password.length < 8) {
      setMessage("Password should be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    const newUser = {
      username,
      password,
      email,
    };

    addUser(newUser);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const addUser = async (newUser) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (res.ok) {
        console.log("Registered successfully:", { username, email });
        alert("Registration successful!");
        navigate("/login");
      } else {
        console.error("Failed to add user.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const gLogin = () => {
    auth.googleLogin();
    return;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex h-2/3 min-h-[450px]">
        <div className="flex flex-col bg-white max-w-[450px] min-w-[350px] lg:w-1/2 xl:w-1/2 sm:w-1/2 justify-center items-center h-[100%] w-1/4 font-Roboto mb-24 rounded-tl-sm rounded-bl-sm">
          <button
            onClick={gLogin}
            className="flex items-center justify-center border p-2 mb-2.5 w-3/4 rounded-sm border-borderBlue"
          >
            <img src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
            <span className="text-gray-700 font-medium text-xs">
              Continue with Google
            </span>
          </button>
          <p className="flex mb-2.5 font-bold">Or</p>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegistration();
            }}
          >
            <input
              className="flex w-3/4 border mb-3 rounded-sm bg-inputGrey text-xs p-1 border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            ></input>
            <input
              className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Password"
              type="password" //security measure
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            {message && (
              <p className="text-red-500 text-xs mb-2.5">{message}</p>
            )}
            <button
              type="submit"
              className="flex w-3/4 justify-center p-2 rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreenDark  hover:bg-darkGreen hover:text-white transition-all duration-500 mt-10"
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex">
          <img
            src={register}
            alt="placeholder"
            className="sm:block hidden rounded-tr-sm rounded-br-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
