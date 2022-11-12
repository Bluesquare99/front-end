import * as nc from 'node-cron';
import {
	SECRET_POSTGRES_USER,
	SECRET_POSTGRES_HOST,
	SECRET_POSTGRES_DB,
	SECRET_POSTGRES_PASSWORD,
	SECRET_POSTGRES_PORT
} from '$env/static/private';
import { Client } from 'pg';

const client = new Client({
	user: SECRET_POSTGRES_USER,
	host: SECRET_POSTGRES_HOST,
	database: SECRET_POSTGRES_DB,
	password: SECRET_POSTGRES_PASSWORD,
	port: SECRET_POSTGRES_PORT
});

client.connect();

export async function load() {
	const currentUnix = Date.now() / 1000;
	console.log('current unix', currentUnix);
	let queryString = `SELECT station, show, dj, description FROM schedules WHERE ${currentUnix} >= begin_unix AND ${currentUnix} < end_unix`;

	let currentShows = {};

	return new Promise((resolve, reject) =>
		client.query(queryString, (err, data) => {
			// console.log(err, res)
			if (!data) return reject(err);
			data['rows'].forEach((currentShow) => {
				console.log(currentShow);
				const { station, show, dj, description } = currentShow;

				currentShows[station] = {
					show: show,
					dj: dj,
					description: description,
					colorValues: []
				};
			});
			console.log('current shows has been updated!');
			resolve({ currentShows });
		})
	);
}
