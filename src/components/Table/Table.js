import React from "react";

export const Table = ({ children }) => {
	return (
		<table className={`max-w-screen-xl mx-auto my-4 rounded shadow`}>
			{children}
		</table>
	);
};

export const TableHeadRow = ({ children, numberOfCols }) => {
	const columns = `grid-cols-${numberOfCols}`;
	return (
		<tr className={` grid ${columns} border-b-2 border-gray-100`}>
			{children}
		</tr>
	);
};

export const TableHeadElement = ({ children }) => {
	return (
		<thead className='text-center font-bold py-2 px-4 border-r-2 border-gray-50'>
			{children}
		</thead>
	);
};

export const TableRow = ({ children, numberOfCols }) => {
	const columns = `grid-cols-${numberOfCols}`;
	return (
		<tbody className={` grid  ${columns} border-b-2 border-gray-100`}>
			{children}
		</tbody>
	);
};

export const TableRowElement = ({ children }) => {
	return <tr className='py-2 px-4 border-r-2 border-gray-50'>{children}</tr>;
};
