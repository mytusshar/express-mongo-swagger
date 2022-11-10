const Player = require('../../models/player.schema');
const LoggerSingleton = require('../../../commons/logger/loggerSingleton');
const logger = LoggerSingleton.getLogger();

const modelTag = 'Player';

async function getAllPlayers(reqPage, reqLimit) {
	try {
		logger.log('Executing getAllPlayers()');
		let options = {};
		let total = Player.countDocuments(options);
		let page = parseInt(reqPage) || 1;
		let limit = parseInt(reqLimit) || parseInt(await total);
		let last_page = Math.ceil(parseInt(await total) / limit);
		last_page = last_page < 1 && total > 0 ? 1 : last_page;

		const players = await Player.find(options)
			.skip((page - 1) * limit)
			.limit(limit);
		return {
			success: true,
			data: players,
			total: (await total).toString(),
			page: (await page).toString(),
			last_page: (await last_page).toString()
		};
	} catch (error) {
		logger.logError({ message: 'Error in getAllPlayers()', error });
		return { success: false, message: `${modelTag} not found` };
	}
}

async function getPlayerById(id) {
	try {
		logger.log('Executing getPlayerById()');
		let player = await Player.findById(id);
		if (player == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}
		return {
			success: true,
			data: player
		};
	} catch (err) {
		logger.logError({ message: 'Error in getPlayerById()', error });
		return { success: false, message: err.message };
	}
}

async function addPlayer(body) {
	try {
		logger.log('Executing addPlayer()');
		const player = new Player(body);
		const newCreditScore = await player.save();
		return {
			success: true,
			data: newCreditScore
		};
	} catch (err) {
		logger.logError({ message: 'Error in addPlayer()', error });
		return { success: false, message: `Failed to add ${modelTag}` };
	}
}

async function updatePlayer(id, name = null, score = null) {
	try {
		logger.log('Executing updatePlayer()');
		let player = await Player.findById(id);
		if (player == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}
		if (name != null) {
			player.name = name;
		}
		if (score != null) {
			player.score = score;
		}

		const updatedPlayer = await player.save();
		return {
			success: true,
			data: updatedPlayer,
			message: `${modelTag} updated successfully`
		};
	} catch (err) {
		logger.logError({ message: 'Error in updatePlayer()', error });
		return { success: false, message: `Failed to update ${modelTag}` };
	}
}

async function removePlayer(id) {
	try {
		logger.log('Executing removePlayer()');
		let player = await Player.findById(id);
		if (player == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}

		await player.remove();
		return {
			success: true,
			message: `Deleted ${modelTag}`
		};
	} catch (err) {
		logger.logError({ message: 'Error in removePlayer()', error });
		return { success: false, message: err.message };
	}
}

module.exports = {
	getAllPlayers,
	getPlayerById,
	addPlayer,
	updatePlayer,
	removePlayer
};
