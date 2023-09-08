import { PLAYER_RESULTS } from '~/server/consts/test/players.js';

export default defineEventHandler(() =>
{
	return new Promise(resolve => setTimeout(resolve, 1000, PLAYER_RESULTS));
});
