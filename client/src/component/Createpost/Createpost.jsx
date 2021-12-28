import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Createpost.css";
const Createpost = () => {
  const history = useHistory();

  const [userdata, setuserdata] = useState({
    title: "",
    content: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setuserdata({ ...userdata, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const { title, content } = userdata;
      const res = await fetch("/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        alert("please enter data");
      } else if (res.status === 422) {
        alert("please enter correct phone no.");
      } else if (res.status === 201) {
        alert("add Item successfully");
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="contariner-fluid m-5 formContainer">
          <form method="POST" autoComplete="off" className="formContainer">
            <div className="row mb-3">
              <label htmlFor="Name" className="col-sm-2 col-form-label">
                Title
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="title"
                placeholder="Enter title"
                value={userdata.title}
                onChange={handleInput}
              />
            </div>
            <div class="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="col-2-sm-2 col-form-label"
              >
                Add content
              </label>
              <textarea
                class="form-control col-sm-10"
                id="exampleFormControlTextarea1"
                rows="3"
                name="content"
                value={userdata.content}
                onChange={handleInput}
                placeholder="Enter Content"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-outline-dark submitBtn "
              onClick={postData}
            >
              Add Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Createpost;
