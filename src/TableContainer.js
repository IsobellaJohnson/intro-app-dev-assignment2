import react from "react";
import { useTable } from "react-table";
import TestModal from "./components/modal";

export default function Table({ columns, data }) {
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
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
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
							 <TestModal/>
							  <button type="button" class="CRUDbtn U">
							  &#9998;
      						</button>
							  <button type="button" class="CRUDbtn D"> 
							  X
      						</button>
							 
						</tr>
					)
				})}
				
			</tbody>
      
		</table>
	)
}
