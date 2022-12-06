import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "../../components/protectedRoute/ProtectedRoute";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as:
        <div>{user?.email}</div>
        <button className="dashboard__btn">
          <Link to="/">Go to Homepage</Link>
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
