const express = require('express');
const connectDb = require('./config/db');
const {
	scoreCredits
} = require('./src/modules/score-credits/score-credits.index');
const { player } = require('./src/modules/player/player.index');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const LoggerSingleton = require('./commons/logger/loggerSingleton');
const logger = LoggerSingleton.getLogger();

const app = express();
connectDb();

app.use(express.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'ScoreCredits REST API',
			description: 'ScoreCredits REST API'
		}
	},
	apis: [
		'./src/modules/player/player.routes.js',
		'./src/modules/score-credits/score-credits.routes.js'
	]
};

app.use('/scorecredits', scoreCredits);
app.use('/player', player);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.PORT || 5000, () => logger.log('Server running'));
