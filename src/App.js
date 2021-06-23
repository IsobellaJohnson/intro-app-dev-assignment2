import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MovieTable from './MovieTableContainer';
import RatingTable from './RatingTableContainer';
import ReviewerTable from './ReviewerTableContainer';
import './App.css';
import UpdateMovieModal from "./components/updateMovieModal";
import UpdateModalrev from "./components/updateReviewerModal"
import UpdateModalrate from "./components/updateRatingModal"
import MovieModal from "./components/movieModal";
import RatingModal from "./components/ratingModal";
import ReviewerModal from "./components/reviewerModal";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <Router>
      <div>
        <nav className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/reviewers">Reviewers</Link>
            </li>
            <li>
              <Link to="/ratings">Ratings</Link>
            </li>
          </ul>
        </nav>

        {}
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/reviewers">
            <Reviewers />
          </Route>
          <Route path="/ratings">
            <Ratings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }


function Home() {
  return <h2 className="welcome">Welcome</h2>;
}

function Movies() {
  const [movieData, setData] = useState([]);

  useEffect(() => {
    axios("https://introappdev.herokuapp.com/api/movies")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
  }, []);

  const deleteItemFromState = (id) => {
    const updatedItems = movieData.filter((item) => item.id !== id);
    setData(updatedItems);
  };
   
  const columns = useMemo(
    () => [
      {
        Header: "Movies",
        columns: [
          {
            Header: "id",
            accessor: "id"
          },
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Genre",
            accessor: "genre"
            
          },
          {
            Header: "Year",
            accessor: "year"
          },
          {
            Header: "Director",
            accessor: "director"
          }
        ]
      }
    ]
  )
  
  return (
    <div className="App">
      <h1>Movies</h1>
      <MovieTable columns={columns} data={movieData} modal={<MovieModal/>} updateModal={<UpdateMovieModal/>} deleteItemFromState={deleteItemFromState} />
    </div>
  ); 
}

function Ratings() {

  const [ratingData, setRatingData] = useState([]);

  useEffect(() => {
    axios("https://introappdev.herokuapp.com/api/ratings")
    .then((res) => {
      setRatingData(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err))
  }, []);

  const deleteItemFromState = (id) => {
    const updatedItems = ratingData.filter((item) => item.id !== id);
    setRatingData(updatedItems);
  };

  const columns3 = useMemo(
    () => [
      {
        Header: "Ratings",
        columns: [
          {
            Header: "id",
            accessor: "id"
          },
          {
            Header: "Rating Date",
            accessor: "ratingDate"
          },
          {
            Header: "Rating",
            accessor: "rating"
          }
        ]
      }
    ]
  )

  return (
    <div className="App">
      <h1>Ratings</h1>
      <RatingTable key={ratingData.id} columns={columns3} data={ratingData} modal={<RatingModal />} deleteItemFromState={deleteItemFromState} UpdateModal={<UpdateModalrate/>} />
    </div>
  );
}

function Reviewers() {
  const [reviewerData, setReviewerData] = useState([]);

  useEffect(() => {
    axios("https://introappdev.herokuapp.com/api/reviewers")
      .then((res) => {
        setReviewerData(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, []);

  const deleteItemFromState = (id) => {
    const updatedItems = reviewerData.filter((item) => item.id !== id);
    setReviewerData(updatedItems);
  };

  const columns2 = useMemo(
    () => [
      {
        Header: "Reviewers",
        columns: [
          {
            Header: "id",
            accessor: "id"
          },
          {
            Header: "First Name",
            accessor: "first_name"
          },
          {
            Header: "Last Name",
            accessor: "last_name"
          },         
        ]
      }
    ]
  )
  return (
    <div className="App">
      <h1>Reviewers</h1>
      <ReviewerTable key={reviewerData.id} columns={columns2} data={reviewerData} modal={<ReviewerModal/>} deleteItemFromState={deleteItemFromState} UpdateModal={<UpdateModalrev/>} />
    </div>

    
  );

}



export default App;
