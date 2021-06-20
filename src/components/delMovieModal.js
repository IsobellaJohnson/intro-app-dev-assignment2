import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

export default function DelMovieModal(props){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    // console.log(data.data[3].id);

    // const {register, handleSubmit} = useForm();
    function openModal() {
      setIsOpen(true);
      console.log(props.id)
     // console.log({data.id})
    }
    function deleteMovie() {
  axios.delete(`https://introappdev.herokuapp.com/api/movies/${props.id}`);
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
  deleteMovie()
}


return (
  <>
      <button type="button" class="CRUDbtn D" onClick={openModal}>X</button>
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
    <h1 class="title">Are you sure you want to delete this?</h1>
    

    <button class="" type="submit">yes</button>
    <button class="" type="submit">no</button>
  </form>
  
    </Modal>

  </>
);
  }
