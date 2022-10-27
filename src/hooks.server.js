import { currentShows } from './stores.js'
import { get } from 'svelte/store';

export async function handle({ event, resolve }) {
    event.locals.currentShows = get(currentShows);

    const response = await resolve(event);

    return response;
}


// /**
//  * SECTION: Query DB and Update Store
//  */
// import * as nc from 'node-cron'
// // Initial
// updateCurrentShows()

// // Recurring query
// cron.schedule('*/30 * * * *', () => {
//     console.log('time', new Date().getMinutes());
//     updateCurrentShows();
// });

