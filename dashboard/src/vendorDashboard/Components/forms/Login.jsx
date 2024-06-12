import { useState } from "react";
import { API_PATH } from "../../helpers/ApiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_PATH}vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId = data.vendorId;
      const vendorResponse = await fetch(
        `${API_PATH}vendor/single-vendor/${vendorId}`
      );
      const vendorData = await vendorResponse.json();
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem("firmName", vendorFirmName);
        localStorage.setItem("firmId", vendorFirmId);
      }
      window.location.reload();
    } catch (error) {
      alert("login failed");
      console.log(error);
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="text"
          value={email}
          name="email"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          value={password}
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
