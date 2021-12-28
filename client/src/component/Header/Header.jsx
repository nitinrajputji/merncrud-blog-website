import React, { useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const callProduct = async (req, res) => {
    try {
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      await res.json();
      if (!res.status === 200) {
        throw new Error("user not found");
      }
    } catch (error) {
      alert("please login");
      history.push("/");
    }
  };
  useEffect(() => {
    callProduct();
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="btn-info">BLOG</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav  mx-auto ">
              <li className="nav-item">
                <NavLink
                  className="nav-link  btn-info btn-outline-sccess navBtn   mx-5"
                  to="/home"
                >
                  ALLPOST
                </NavLink>
              </li>
              <li className="nav-item btn-light btn-outline-primary">
                <NavLink className="nav-link navBtn " to="/createpost">
                  Create Post
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
