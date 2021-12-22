import React, { useState } from "react";
import { Avatar } from "stream-chat-react";
import { authService } from "../services/authService";
import { cloudinaryService } from "../services/cloudinaryService";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};
function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);
  const [msg, setMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const onUploadImg = async (ev) => {
    setIsUploading(true);
    try {
      const { secure_url } = await cloudinaryService.uploadImg(
        ev.target.files[0]
      );

      setForm({ ...form, avatarURL: secure_url });
      setIsUploading(false);
    } catch (err) {
      setMsg("Couldnt upload your image try again");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUploading) return;

      await authService.loginSignup(form, isSignup);
      window.location.reload();
    } catch (error) {
      //TODO: make the error message more spesific

      console.log(error);
      setMsg("Something went wrong , please try again");
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="form-container ">
      <div className="fields flex center-center">
        <div className="content">
          <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="input">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <label className="upload-link">Upload a profile picture<input onChange={onUploadImg} type="file" hidden /></label>
            )}

            <div className="main-btn">
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Auth;
