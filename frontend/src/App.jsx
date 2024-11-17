import { useState } from "react";
import "./App.css";
import Login from "./auth/Login";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EmployeeTable from "./components/EmployeeTable";
import CreateForm from "./components/forms/CreateForm";
import UpdateForm from "./components/forms/UpdateForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLogIn, setIsLogIn] = useState(document.cookie.match("authToken")); // Initialize based on auth-token

  // If the user is not authenticated, redirect to the login page or expire the cookie.
  if (!isLogIn) {
    return (
      <div className="login-page">
        <div className="logo-img"></div>
        <Login setIsLogIn={setIsLogIn} />
        <ToastContainer />
      </div>
    );
  }

  return (
    <>
      <div className="all-page">
        <div className="section-all-page">
          <Header setIsLogIn={setIsLogIn} />
          <div className="upper-cover-section"></div>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employees" element={<EmployeeTable />} />
              <Route path="/employee/add" element={<CreateForm />} />
              <Route path="/employee/edit/:id" element={<UpdateForm />} />
            </Routes>
          </main>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
