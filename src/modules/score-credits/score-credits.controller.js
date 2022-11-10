const ScoreCredits = require('../../models/score-credits.schema');
const LoggerSingleton = require('../../../commons/logger/loggerSingleton');
const logger = LoggerSingleton.getLogger();

const modelTag = 'ScoreCredits';

async function getAllScoreCredits(reqPage, reqLimit) {
	try {
		logger.log('Executing getAllScoreCredits()');
		let options = {};
		let total = ScoreCredits.countDocuments(options);
		let page = parseInt(reqPage) || 1;
		let limit = parseInt(reqLimit) || parseInt(await total);
		let last_page = Math.ceil(parseInt(await total) / limit);
		last_page = last_page < 1 && total > 0 ? 1 : last_page;

		const scoreCredits = await ScoreCredits.find(options)
			.skip((page - 1) * limit)
			.limit(limit);
		return {
			success: true,
			data: scoreCredits,
			total: (await total).toString(),
			page: (await page).toString(),
			last_page: (await last_page).toString()
		};
	} catch (error) {
		logger.logError({ message: 'Error in getAllScoreCredits()', error });
		return { success: false, message: `${modelTag} not found` };
	}
}

async function getScoreCreditsById(id) {
	try {
		logger.log('Executing getScoreCreditsById()');
		let scoreCredits = await ScoreCredits.findById(id);
		if (scoreCredits == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}
		return {
			success: true,
			data: scoreCredits
		};
	} catch (err) {
		logger.logError({ message: 'Error in getScoreCreditsById()', error });
		return { success: false, message: err.message };
	}
}

async function addScoreCredits(body) {
	try {
		logger.log('Executing addScoreCredits()');
		const scoreCredits = new ScoreCredits(body);
		const newCreditScore = await scoreCredits.save();
		return {
			success: true,
			data: newCreditScore
		};
	} catch (err) {
		logger.logError({ message: 'Error in addScoreCredits()', error });
		return { success: false, message: `Failed to add ${modelTag}` };
	}
}

async function updateScoreCredits(id, score = null, credits = null) {
	try {
		logger.log('Executing updateScoreCredits()');
		let scoreCredits = await ScoreCredits.findById(id);
		if (scoreCredits == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}
		if (score != null) {
			scoreCredits.score = score;
		}
		if (credits != null) {
			scoreCredits.credits = credits;
		}

		const updatedScoreCredits = await scoreCredits.save();
		return {
			success: true,
			data: updatedScoreCredits,
			message: `${modelTag} updated successfully`
		};
	} catch (err) {
		logger.logError({ message: 'Error in updateScoreCredits()', error });
		return { success: false, message: `Failed to update ${modelTag}` };
	}
}

async function removeScoreCredits(id) {
	try {
		logger.log('Executing removeScoreCredits()');
		let scoreCredits = await ScoreCredits.findById(id);
		if (scoreCredits == null) {
			return { success: false, message: `Cannot find ${modelTag}` };
		}

		await scoreCredits.remove();
		return {
			success: true,
			message: `Deleted ${modelTag}`
		};
	} catch (err) {
		logger.logError({ message: 'Error in removeScoreCredits()', error });
		return { success: false, message: err.message };
	}
}

module.exports = {
	getAllScoreCredits,
	getScoreCreditsById,
	addScoreCredits,
	updateScoreCredits,
	removeScoreCredits
};
