import react from "react";
import { useTable } from "react-table";
import MovieModal from "./components/movieModal";

export default function MovieTable({ columns, data, modal }) {
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
								{/* {modal} */}
							  <button type="button" class="CRUDbtn U">
							  &#9998;
      						</button>
							  <button type="button" class="CRUDbtn D"> 
							  X
      						</button>
							  </td>
						</tr>
					)
				})}
				
			</tbody>
      
		</table>	
		</>	
	)
}
