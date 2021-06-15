import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'

  export default function MovieModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
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

return (
  <>
    <button type="button" class="CRUDbtn C" onClick={openModal}>+</button>
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >

      <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
      <button onClick={closeModal}>X</button>

      <form class="modalForm" action="" method="post" enctype="multipart/form-data">
    <h1 class="title">Add Movie</h1>
    
      <label for="name">Rating:</label>
      <input type="text" id="name" name="name" class="formInput"/>
      
      <label for="year">Rating Date:</label>
      <input type="text" id="year" name="year" class="formInput"/>

    <button class="addBtn" type="submit">Add</button>
  </form>
    </Modal>
  </>
);
  }
