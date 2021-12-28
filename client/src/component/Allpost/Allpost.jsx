import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Allpost.css";

const Allpost = () => {
  const [userData, setuserData] = useState([]);
  console.log(userData);

  const [updatedItem, setUpdateItem] = useState({
    title: "",
    content: "",
  });

  const getData = async () => {
    try {
      const res = await fetch("/read", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setuserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`);
    getData();
    alert("item delete");
  };
  const onUpdate = (id) => {
    setUpdateItem((preInput) => {
      return { ...preInput, id: id };
    });
  };

  return (
    <>
      <div className="mainContainer">
        <div className="mainCardContainer">
          {userData.map((val) => {
            return (
              <>
                <div className="cardContainer">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{val.title}</h5>
                      <p class="card-text">{val.content}</p>

                      <Link
                        to={`/updatepost/${val._id}`}
                        className="btn btn-outline-dark mx-5"
                        onClick={() => {
                          onUpdate(val._id);
                        }}
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() => deleteData(val._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Allpost;
