import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./update.css";

const Update = () => {
  const { id } = useParams();
  const ID = String(id);
  const history = useHistory();

  const [updatedItem, setUpdatedItem] = useState({
    Name: "",
    Mobile: "",
    Email: "",
    Password: "",
    City: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/read`).then((response) => {
      const data = response.data;
      data
        .filter((val) => {
          return val._id === ID;
        })
        .map((val) => {
          setUpdatedItem(val);
        });
    });
  }, [ID]);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((preInput) => {
      return {
        ...preInput,
        [name]: value,
      };
    });
  };

  const updateItem = (id) => {
    axios
      .put(`http://localhost:3000/update/${ID}`, updatedItem)
      .then((res) => {});
    alert("item updated");
    history.push("/Home");
  };

  return (
    <>
      <div className="mainContainer">
        <div className="contariner-fluid m-5 formContainer">
          <form method="POST" autoComplete="off">
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
                value={updatedItem.title}
                onChange={handleUpdate}
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
                value={updatedItem.content}
                onChange={handleUpdate}
                placeholder="Enter Content"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-outline-dark submitBtn "
              onClick={updateItem}
            >
              Update Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
