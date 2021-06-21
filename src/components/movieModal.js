import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.css";
import customStyles from "./customStyles";
import axios from "axios";

export default function MovieModal(props) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // const {register, handleSubmit} = useForm();
  const [values, setValues] = useState({
    title: "",
    genre: "",
    year: "",
    director: "",
    reviewer_id: "",
    rating_id: "",
  });
  function openModal() {
    setIsOpen(true);
  }

  // const onSubmit = (data) => {
  //   console.log(data)
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  const postMovie = async () => {
    await axios.post("https://introappdev.herokuapp.com/api/movies", values);
  };
  // function deleteMovie() {
  //   axios.delete(`https://introappdev.herokuapp.com/api/movies/${props.id}`);
  // }

  const title = (e) => {
    setValues({ ...values, title: e.target.value });
  };
  const genre = (e) => {
    setValues({ ...values, genre: e.target.value });
  };
  const year = (e) => {
    setValues({ ...values, year: e.target.value });
  };
  const director = (e) => {
    setValues({ ...values, director: e.target.value });
  };
  const reviewer_id = (e) => {
    setValues({ ...values, reviewer_id: e.target.value });
  };
  const rating_id = (e) => {
    setValues({ ...values, rating_id: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postMovie();
    console.log(values);
  };

  return (
    <>
      <button type="button" className="addBtn" onClick={openModal}>
        Add Movie
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
          <h1 className="title">Add Movie</h1>

          <label for="name">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="formInput"
            value={values.title}
            onChange={title}
          />

          <label for="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="formInput"
            value={values.genre}
            onChange={genre}
          />

          <label for="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            className="formInput"
            value={values.year}
            onChange={year}
          />

          <label for="year">Director:</label>
          <input
            type="text"
            id="director"
            name="director"
            className="formInput"
            value={values.director}
            onChange={director}
          />

          <label for="reviewer">reviewer id:</label>
          <input
            type="text"
            id="director"
            name="director"
            className="formInput"
            value={values.reviewer_id}
            onChange={reviewer_id}
          />

          <label for="reviewer">rating id:</label>
          <input
            type="text"
            id="director"
            name="director"
            className="formInput"
            value={values.rating_id}
            onChange={rating_id}
          />

          <button className="" type="submit">
            Add
          </button>
        </form>
      </Modal>
    </>
  );
}
