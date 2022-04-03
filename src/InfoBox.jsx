import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css';

const InfoBox = (props) => {
	const { title, cases, total, active, isRed, isOrange, ...otherProps } =
		props;
	return (
		<Card
			onClick={otherProps.onClick}
			className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} ${isOrange && 'infoBox--orange'}`}
		>
			<CardContent>
				<Typography color='textSecondary' gutterBottom>
					{title}
				</Typography>
				<h2
					className={`infoBox__cases ${!isRed && 'infoBox__cases--green'} ${isOrange && 'infoBox__total--orange'}`}
				>
					{cases}
				</h2>

				<Typography className='infoBox__total' color='textSecondary'>
					{total} Total
				</Typography>
			</CardContent>
		</Card>
	);
};

export default InfoBox;
