import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import './modal.css'
import customStyles from './customStyles'
import axios from "axios";

export default function UpdateRatingModal(props){
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [first_name, set_first_name] = useState('');
    const [last_name, set_last_name] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [revData, setData] = useState(null);

    const handleSubmit = () => {
      setLoading(true);
      setIsError(false);
      const revData = {
        first_name: first_name,
        last_name: last_name
      }
      axios.put(`https://introappdev.herokuapp.com/api/ratings/${props.id}`, revData).then(res => {
      setData(res.data);
      set_first_name('');
      set_last_name('');
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
    // const {register, handleSubmit} = useForm();
    function openModal() {
      setIsOpen(true);
    }
function updateRating() {

}
  
function afterOpenModal() {
  // references are now sync'd and can be accessed.
  subtitle.style.color = '#f00';
}
function closeModal(){
  setIsOpen(false);
}

// const handleSubmit = (e) => {
//   e.preventDefault();
//   updateRating()
//   console.log()
// }


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
    <h1>Update Reviewer:</h1>
    {/* <label for="fname">First Name:</label>
    <input type="text" id="fname" name="fname"></input>
    <label for="lname">Last Name:</label>
    <input type="text" id="lname" name="lname"></input> */}
<div>
<input
            type="text"
            className="form-control"
            id="first_name"
            placeholder="Enter first name"
            value={first_name}
            onChange={e => set_first_name(e.target.value)} />
        </div>
        <div classNames="form-group">
          <input
            type="text"
            className="form-control"
            id="last_name"
            placeholder="Enter last name"
            value={last_name}
            onChange={e => set_last_name(e.target.value)} />
        </div>



    <button class="" type="submit">Confirm Changes</button>

  </form>
  
    </Modal>


  </>
);
  }