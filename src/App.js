import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
//import { useTable } from "react-table";
import Table from './TableContainer'
import './App.css';

function App() {
  const [data, setData] = useState([]);

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
      <Table key={data.id} columns={columns} data={data} />
    </div>
  );
}

export default App;
