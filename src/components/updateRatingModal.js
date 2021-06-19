import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

export default function UpdateRatingModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);

    // const {register, handleSubmit} = useForm();
    function openModal() {
      setIsOpen(true);
    }
function updateMovie() {
  axios.post('https://introappdev.herokuapp.com/api/Rating/');
}
  // const deleteMovie = () => {
     
  // }
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = '#f00';
}
function closeModal(){
  setIsOpen(false);
}

const handleSubmit = (e) => {
  e.preventDefault();
  updateMovie()
  console.log()
}


return (
  <>
      <button type="button" class="CRUDbtn U" onClick={openModal}> &#9998;</button>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Movie Modal"
    >

      <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
      <button onClick={closeModal}>X</button>

      <form class="modalForm" onSubmit={handleSubmit} enctype="multipart/form-data">
    <h1>Update Rating:</h1>
    <label for="fname">Rating</label>
    <input type="text" id="fname" name="fname"></input>
    <label for="lname">Rating date</label>
    <input type="text" id="lname" name="lname"></input>


    <button class="" type="submit">Confirm Changes</button>

  </form>
  
    </Modal>

  </>
);
  }