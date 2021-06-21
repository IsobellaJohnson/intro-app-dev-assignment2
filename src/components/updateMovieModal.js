import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./modal.css";
import customStyles from "./customStyles";
import axios from "axios";

export default function UpdateMovieModal() {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // const {register, handleSubmit} = useForm();
  function openModal() {
    setIsOpen(true);
  }
  function updateMovie() {
    axios.post("https://introappdev.herokuapp.com/api/movies/");
  }
  // const deleteMovie = () => {

  // }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie();
    console.log();
  };

  return (
    <>
      <button type="button" className="CRUDbtn U" onClick={openModal}>
        {" "}
        &#9998;
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
          <h1>Update Movie:</h1>
          <label for="fname">Title</label>
          <input type="text" id="fname" name="fname"></input>
          <label for="lname">Year</label>
          <input type="text" id="lname" name="lname"></input>
          <label for="fname">Director:</label>
          <input type="text" id="fname" name="fname"></input>
          <label for="lname">Genre:</label>
          <input type="text" id="lname" name="lname"></input>
          <label for="fname">Reviewer ID:</label>
          <input type="text" id="fname" name="fname"></input>
          <label for="lname">Rating ID</label>
          <input type="text" id="lname" name="lname"></input>

          <button className="" type="submit">
            Confirm Changes
          </button>
        </form>
      </Modal>
    </>
  );
}
