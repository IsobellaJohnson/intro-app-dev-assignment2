import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import { useTable } from "react-table";
import Table from './TableContainer';
import './App.css';
import apiPagination from './components/pagination';

function App() {

  return (
    <Router>
      <div>
        <nav class="navBar">
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
  return <h2 class="welcome">Welcome</h2>;
}

function Movies() {
  const [movieData, setData] = useState([]);

  useEffect(() => {
    axios("https://introappdev.herokuapp.com/api/movies")
      .then((res) => {
        setData(res.data);
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, []);

   
  const columns = useMemo(
    () => [
      {
        Header: "Movies",
        columns: [
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Genre",
            accessor: "genre",
            
          },
          {
            Header: "Year",
            accessor: "year"
          },
          {
            Header: "Director",
            accessor: "director"
          },
        ]
      }
    ]
  )
  return (
    <div className="App">
      <h1><center>Movies</center></h1>
      <Table key={movieData.id} columns={columns} data={movieData} />
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

  const columns3 = useMemo(
    () => [
      {
        Header: "Ratings",
        columns: [
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
      <h1><center>Ratings</center></h1>
      <Table key={ratingData.id} columns={columns3} data={ratingData} />
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

  const columns2 = useMemo(
    () => [
      {
        Header: "Reviewers",
        columns: [
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
      <h1><center>Reviewers</center></h1>
      <apiPagination/>
      <Table key={reviewerData.id} columns={columns2} data={reviewerData} />
    </div>
  );

}



export default App;
