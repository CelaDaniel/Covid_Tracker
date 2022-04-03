import React from 'react';
import './Table.css';
import numeral from 'numeral';

const Table = (props) => {
	const { countries } = props;
	return (
		<div className='table'>
			<table
				style={{
					width: '100%',
					margin: '0 auto',
				}}
			>
				<thead>
					<tr
						style={{
							backgroundColor: '#fff',
							color: '#000',
						}}
					>
						<th scope='col'>
							<strong>Country</strong>
						</th>
						<th scope='col'>
							<strong>Cases</strong>
						</th>
					</tr>
				</thead>
				<tbody>
					{countries?.map(({ country, cases }) => (
						<tr key={country}>
							<td>{country}</td>
							<td>
								<strong>{numeral(cases).format('0,0')}</strong>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
