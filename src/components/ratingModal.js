import React, { useState } from "react";
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

  export default function MovieModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [values, setValues] = useState({
      rating:"",
      ratingDate:""
    })
    function openModal() {
      setIsOpen(true);
    }

function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = '#f00';
}

function closeModal(){
  setIsOpen(false);
}
const postRating = async() => {
  await axios.post("https://introappdev.herokuapp.com/api/ratings", values)
}

const rating=(e)=> {
  setValues({...values,rating:e.target.value})
}
const ratingDate=(e)=> {
  setValues({...values,ratingDate:e.target.value})
}

const handleSubmit = (e) => {
  e.preventDefault();
  postRating()
  console.log(values)
}


return (
  <>
    <button type="button" class="addBtn" onClick={openModal}>Add Rating</button>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >

      <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
      <button onClick={closeModal}>X</button>

      <form class="modalForm"  onSubmit={handleSubmit} enctype="multipart/form-data">
    <h1 class="title">Add Rating</h1>
    
      <label for="name">Rating:</label>
      <input type="text" id="name" name="name" class="formInput"  value={values.rating} onChange={rating}/>
      
      <label for="year">Rating Date:</label>
      <input type="text" id="year" name="year" class="formInput" value={values.ratingDate} onChange={ratingDate}/>

    <button class="addBtn" type="submit">Add</button>
  </form>
    </Modal>
  </>
);
  }
