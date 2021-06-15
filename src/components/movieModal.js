import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

//create post.js, place componentdidmount into form, import to modal? change data to the same params idk

  export default function MovieModal(){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }

    function postMovie(){
      axios({
        method: 'post',
        url: 'https://introappdev.herokuapp.com/api/movies',
        data: {
            title: "title",
            genre: "genre",
            year: "year",
            director: "director"
        }
    })
    .then(res => this.setState({ movies: res.data }));
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
      contentLabel="Movie Modal"
    >

      <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
      <button onClick={closeModal}>X</button>

      <form class="modalForm" action={postMovie} enctype="multipart/form-data">
    <h1 class="title">Add Movie</h1>
    
      <label for="name">Title:</label>
      <input type="text" id="title" name="title" class="formInput"/>

      <label for="genre">Genre:</label>
      <input type="text" id="genre" name="genre" class="formInput"/>
      
      <label for="year">Year:</label>
      <input type="text" id="year" name="year" class="formInput"/>
      
      <label for="year">Director:</label>
      <input type="text" id="director" name="director" class="formInput"/>
      


    <button class="addBtn" type="submit">Add</button>
  </form>
    </Modal>
  </>
);
  }
