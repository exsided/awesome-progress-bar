export const getGamesData = (games) =>
{
	let isPlayed = false;

	const totalScores = games.reduce((total, game) =>
	{
		total += game.bestResult;

		if (game.isPlayed)
			isPlayed = true;

		return total;
	}, 0);

	return {
		isPlayed,
		totalScores,
	};
};
