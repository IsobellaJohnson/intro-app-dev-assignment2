import React, { useState } from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

  export default function MovieModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [values, setValues] = useState({
      first_name:"",
      last_name:""
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

const postReviewer = async () => {
  await axios.post('https://introappdev.herokuapp.com/api/reviewers',values)
}

const first_name= (e)=>{
  setValues({...values,first_name:e.target.value})
}
const last_name= (e)=>{
  setValues({...values,last_name:e.target.value})
}
const handleSubmit = (e) => {
  e.preventDefault();
  postReviewer()
  console.log(values)
  // window.location.reload();
  // return false;
}

return (
  <>
    <button type="button" class="addBtn" onClick={openModal}>Add Reviewer</button>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Reviewer Modal"
    >

      <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
      <button onClick={closeModal}>X</button>

      <form class="modalForm" action="" onSubmit={handleSubmit} enctype="multipart/form-data">
    <h1 class="title">Add Reviewer</h1>
    
      <label for="name">First Name:</label>
      <input type="text" id="name" name="name" class="formInput" value={values.first_name} onChange={first_name}/>
      
      <label for="year">Last Name:</label>
      <input type="text" id="year" name="year" class="formInput" value={values.last_name} onChange={last_name}/>


    <button class="addBtn" type="submit">Add</button>
  </form>
    </Modal>
  </>
);
  }
