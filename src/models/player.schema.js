const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
	name: {
		type: String
	},
	score: {
		type: Number
	}
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
