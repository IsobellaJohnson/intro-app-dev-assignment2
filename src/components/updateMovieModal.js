import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./modal.css";
import customStyles from "./customStyles";
import axios from "axios";

export default function UpdateMovieModal(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, set_title] = useState("");
  const [genre, set_genre] = useState("");
  const [year, set_year] = useState("");
  const [director, set_director] = useState("");
  const [reviewer_id, set_reviewer_id] = useState("");
  const [rating_id, set_rating_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [revData, setData] = useState(null);

  const handleSubmit = (e) => {
    setLoading(true);
    setIsError(false);
    const movieData = {
      title: title,
      genre: genre,
      year: year,
      director: director,
      reviewer_id: reviewer_id,
      rating_id: rating_id,
    };
    e.preventDefault();
    axios
      .put(
        `https://introappdev.herokuapp.com/api/reviewers/${props.id}`,
        movieData
      )
      .then((res) => {
        setData(res.movieData);
        set_title("");
        set_genre("");
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setIsError(true);
      });
    console.log(movieData);
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
          <h1>Update Movie:</h1>
          <div>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => set_title(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="genre"
              placeholder="Enter genre"
              value={genre}
              onChange={(e) => set_genre(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              id="year"
              placeholder="Enter year"
              value={year}
              onChange={(e) => set_year(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="director"
              placeholder="Enter director"
              value={director}
              onChange={(e) => set_director(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              id="reviewer_id"
              placeholder="Enter reviewer id"
              value={reviewer_id}
              onChange={(e) => set_reviewer_id(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="rating_id"
              placeholder="Enter rating id"
              value={rating_id}
              onChange={(e) => set_rating_id(e.target.value)}
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
