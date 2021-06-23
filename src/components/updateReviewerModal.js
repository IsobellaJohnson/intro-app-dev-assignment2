import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import customStyles from "./customStyles";
import axios from "axios";

export default function UpdateReviewerModal(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [revData, setData] = useState(null);

  const handleSubmit = (e) => {
    setLoading(true);
    setIsError(false);
    const revData = {
      first_name: first_name,
      last_name: last_name,
    };
    e.preventDefault();
    axios
      .put(
        `https://introappdev.herokuapp.com/api/reviewers/${props.id}`,
        revData
      )
      .then((res) => {
        setData(res.revData);
        set_first_name("");
        set_last_name("");
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
      });
    console.log(revData);
  };

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button type="button" className="CRUDbtn U" onClick={openModal}>
        {" "}
        Edit
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Update Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button onClick={closeModal}>X</button>

        <form className="modalForm" onSubmit={handleSubmit}>
          <h1>Update Reviewer:</h1>

          <div>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter first name"
              value={first_name}
              onChange={(e) => set_first_name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter last name"
              value={last_name}
              onChange={(e) => set_last_name(e.target.value)}
            />
          </div>

          <button className="" type="submit">
            Confirm Changes
          </button>
        </form>
      </Modal>
    </>
  );
}
