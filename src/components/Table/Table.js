import React from "react";

export const Table = ({ additionalClasses, children }) => {
	return (
		<table className={`max-w-screen-xl mx-auto my-4 rounded shadow`}>
			{children}
		</table>
	);
};

export const TableHeadRow = ({ additionalClasses, children, numberOfCols }) => {
	return (
		<tr
			className={` grid grid-cols-${numberOfCols} border-b-2 border-gray-100`}
		>
			{children}
		</tr>
	);
};

export const TableHeadElement = ({ additionalClasses, children }) => {
	return (
		<thead className='text-center font-bold py-2 px-4 border-r-2 border-gray-50'>
			{children}
		</thead>
	);
};

export const TableRow = ({ additionalClasses, children, numberOfCols }) => {
	return (
		<tbody
			className={` grid grid-cols-${numberOfCols} border-b-2 border-gray-100`}
		>
			{children}
		</tbody>
	);
};

export const TableRowElement = ({ additionalClasses, children }) => {
	return <tr className='py-2 px-4 border-r-2 border-gray-50'>{children}</tr>;
};
