import { useState } from "react";
import "./auth.css";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogIn }) => {
  const [f_userName, setF_userName] = useState("");
  const [f_Pwd, setF_Pwd] = useState("");
  const [errors, setErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState("");
  const [passErrors, setPassErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages before submission
    setErrors({});
    setEmailErrors("");
    setPassErrors("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ f_userName, f_Pwd }),
      });

      if (!response.ok) {
        const { message, error } = await response.json();

        if (response.status === 404) {
          setEmailErrors(message);
          return;
        }

        // Handle other errors
        setErrors(error || {});
        if (message) {
          setPassErrors(message);
        }
        console.error(error || message);
        return;
      }

      const data = await response.json();
      console.log(data);
      document.cookie = `authToken=${data.authToken}; max-age=60000; path="/"; secure; samesite=strict`;
      localStorage.setItem("username", data.username);

      setTimeout(() => {
        toast.success(`🦄 ${data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }, 1000);

      setIsLogIn(true);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login-card">
      <div className="login-section">
        <h3 className="login-header">Log In</h3>
        <div className="form-group">
          <label>Username</label>
          <input type="text" onChange={(e) => setF_userName(e.target.value)} />
          {errors && (
            <span className="text-error">{errors.username || emailErrors}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="">Password</label>
          <input type="text" onChange={(e) => setF_Pwd(e.target.value)} />
          {errors && (
            <span className="text-error">{errors.password || passErrors}</span>
          )}
        </div>
        <div className="form-group">
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
