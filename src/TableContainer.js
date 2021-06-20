import react from "react";
import { useTable } from "react-table";
import axios from 'axios'

export default function MovieTable({ columns, data, modal, DeleteModal, UpdateModal, deleteItemFromState }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data,
	})

	const deleteItem = (id) => {
    let confirmDelete = window.confirm('Delete item forever?');
		if (confirmDelete) {
			console.log(data[id].id)
			console.log(`https://introappdev.herokuapp.com/api/movies/${data[id].id}`)
			// Do a delete request with axios
			const res = axios.delete(`https://introappdev.herokuapp.com/api/movies/${data[id].id}`)
			// Update state if status code is 202
			if (res.status === 202) {
				deleteItemFromState(data[id].id); 
			} else {
				console.log('Something went wrong')
			}
		}
  };


	return (
		<>
			{modal}
		
			
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
						<th></th>
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								
							})}							
							<td>
								<button onClick={() => deleteItem(row.id)}>Delete</button>
							</td>
						</tr>
					)
				})}
				
			</tbody>
      
		</table>	
		</>	
	)
}
