import React, { useState, useEffect } from 'react';
import { log } from './consoleLog';
import './App.css';
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import numeral from 'numeral';
import 'leaflet/dist/leaflet.css';

const App = () => {
	const [country, setInputCountry] = useState('worldwide');
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [mapCountries, setMapCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState('cases');
	const [mapCenter, setMapCenter] = useState({
		lat: 34.80746,
		lng: -40.4796,
	});
	const [mapZoom, setMapZoom] = useState(3);

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			?.then((response) => response.json())
			?.then((data) => {
				setCountryInfo(data);
			})
			?.catch((err) => {
				log?.err(err);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				?.then((response) => response.json())
				?.then((data) => {
					const countries = data?.map((country) => ({
						name: country?.country,
						value: country?.countryInfo?.iso2,
					}));
					let sortedData = sortData(data);
					setTableData(sortedData);
					setMapCountries(data);
					setCountries(countries);
					log?.succOut(sortedData);
				})
				?.catch((err) => {
					log?.errIn(err);
				});
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (e) => {
		const countryCode = e?.target?.value;
		setInputCountry(countryCode);

		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			?.then((response) => response?.json())
			?.then((data) => {
				setInputCountry(countryCode);
				setCountryInfo(data);
				if(countryCode === 'worldwide'){
					setMapCenter({ lat: 34.80746, lng: -40.4796, })
					setMapZoom(3);
				}else{
					setMapCenter([data?.countryInfo?.lat, data?.countryInfo?.long]);
					setMapZoom(4);
				}
				log?.varOut(data);
			})
			?.catch((err) => {
				log?.errIn(err);
			});
	};

	return (
		<div className='app'>
			<div className='app__left'>
				<div className='app__header'>
					<h1>COVID-19 TRACKER</h1>
					<FormControl className='app__dropdown'>
						<Select
							variant='outlined'
							value={country}
							key='select'
							onChange={onCountryChange}
						>
							<MenuItem value='worldwide' key='worldwide'>
								Worldwide
							</MenuItem>
							{countries?.map((country, idx) => (
								<MenuItem value={country?.value} key={idx}>
									{country?.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className='app__stats'>
					<InfoBox
						isRed
						active={casesType === 'cases'}
						onClick={(e) => setCasesType('cases')}
						title='Coronavirus Cases'
						cases={prettyPrintStat(countryInfo?.todayCases)}
						total={numeral(countryInfo?.cases)?.format('0.0a')}
					/>
					<InfoBox
						active={casesType === 'recovered'}
						onClick={(e) => setCasesType('recovered')}
						title='Recovered'
						cases={prettyPrintStat(countryInfo?.todayRecovered)}
						total={numeral(countryInfo?.recovered)?.format('0.0a')}
					/>
					<InfoBox
						isOrange
						active={casesType === 'deaths'}
						onClick={(e) => setCasesType('deaths')}
						title='Deaths'
						cases={prettyPrintStat(countryInfo?.deaths)}
						total={numeral(countryInfo?.deaths)?.format('0.0a')}
					/>
				</div>

				<Map
					countries={mapCountries}
					casesType={casesType}
					center={mapCenter}
					zoom={mapZoom}
				/>
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3 className='app__right_text-center'>
						<span>Live Cases</span> by Country
					</h3>
					<Table countries={tableData} />
					<h3 className='app__right_text-center app__graphTitle'>
						Worldwide new <span>{casesType}</span>
					</h3>
					<LineGraph className="app__graph" casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
};

export default App;
