import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./modal.css";
import customStyles from "./customStyles";
import axios from "axios";

export default function UpdateRatingModal(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [ratingDate, setratingDate] = useState("");
  const [rating, setrating] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ratingData, setData] = useState(null);
  
  const handleSubmit = (e) => {
    setLoading(true);
    setIsError(false);
    const ratingData = {
      ratingDate: ratingDate,
      rating: rating,
    };
    e.preventDefault();
    axios
    .put(
      `https://introappdev.herokuapp.com/api/ratings/${props.id}`,
        ratingData
    )
    .then((res) => {
      setData(res.ratingData);
      setratingDate("");
      setrating("");
      setLoading(false);
      window.location.reload();
    })
    .catch((err) => {
      setLoading(false);
      setIsError(true);
    });
  console.log(ratingData);
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
        contentLabel="Movie Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button onClick={closeModal}>X</button>

        <form
          className="modalForm"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <h1>Update Rating:</h1>
          <div>
            <input
              type="text"
              className="form-control"
              id="ratingDate"
              placeholder="Enter rating date"
              value={ratingDate}
              onChange={(e) => setratingDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="rating"
              placeholder="Enter new rating"
              value={rating}
              onChange={(e) => setrating(e.target.value)}
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
