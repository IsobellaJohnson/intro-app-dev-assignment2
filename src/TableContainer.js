import react from "react";
import { useTable } from "react-table";
import axios from "axios";
import UpdateModalrow from "./components/updateReviewerModal";
import UpdateRatingModal from "./components/updateRatingModal";
import UpdateMovieModal from "./components/updateMovieModal";
export default function MovieTable({
  columns,
  data,
  modal,
  DeleteModal,
  UpdateModal,
  deleteItemFromState,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      console.log(data[id].id);
      console.log(
        `https://introappdev.herokuapp.com/api/movies/${data[id].id}`
      );
      // Do a delete request with axios
      const res = axios.delete(
        `https://introappdev.herokuapp.com/api/movies/${data[id].id}`
      );
      const res2 = axios.delete(
        `https://introappdev.herokuapp.com/api/ratings/${data[id].id}`
      );
      const res3 = axios.delete(
        `https://introappdev.herokuapp.com/api/reviewers/${data[id].id}`
      );
      // Update state if status code is 202
      if (res.status === 202) {
        deleteItemFromState(data[id].id);
      }
      else {
        console.log("Something went wrong");
      }
    }
  };

  return (
    <>
      {modal}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            console.log(row.id);
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <button
                    className="CRUDbtn D"
                    onClick={() => deleteItem(row.id)}
                  >
                    X
                  </button>
                  <UpdateMovieModal/>
                  <UpdateModalrow id={row.id} />
				          <UpdateRatingModal id={row.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
