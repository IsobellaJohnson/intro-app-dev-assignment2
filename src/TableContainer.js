import react from "react";
import { useTable } from "react-table";

export default function MovieTable({ columns, data, modal, DeleteModal, UpdateModal }) {
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
							{UpdateModal} 
						 	{DeleteModal} 
							  
							  </td>
						</tr>
					)
				})}
				
			</tbody>
      
		</table>	
		</>	
	)
}
