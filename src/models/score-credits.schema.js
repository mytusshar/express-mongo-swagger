const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreCreditSchema = new Schema({
	score: {
		type: Number
	},
	credits: {
		type: Number
	}
});

const ScoreCredits = mongoose.model('ScoreCredits', scoreCreditSchema);

module.exports = ScoreCredits;
