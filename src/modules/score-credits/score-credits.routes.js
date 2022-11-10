const express = require('express');
const router = express.Router();
const {
	addScoreCredits,
	getAllScoreCredits,
	getScoreCreditsById,
	removeScoreCredits,
	updateScoreCredits
} = require('./score-credits.controller');

/**
 * @swagger
 * /scorecredits:
 *   get:
 *     description: All scorecredits
 *     responses:
 *       200:
 *         description: Returns all the scorecredits
 */
router.get('/', async (req, res) => {
	const response = await getAllScoreCredits(req.query.page, req.query.limit);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /scorecredits/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scorecredits ID.
 *     description: Get a scorecredits by id
 *     responses:
 *       200:
 *         description: Returns the requested scorecredits
 */
router.get('/:id', async (req, res) => {
	const response = await getScoreCreditsById(req.params.id);
	res.json(response);
});

/**
 * @swagger
 * /scorecredits:
 *   post:
 *     parameters:
 *      - in: body
 *        name: scorecredits
 *        description: New scorecredits
 *        schema:
 *          type: object
 *          properties:
 *            score:
 *              type: number
 *            credits:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
	const body = {
		score: req.body.score,
		credits: req.body.credits
	};
	const response = await addScoreCredits(body);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /scorecredits/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scorecredits ID.
 *      - in: body
 *        name: scorecredits
 *        description: Update scorecredits
 *        schema:
 *          type: object
 *          properties:
 *            score:
 *              type: number
 *            credits:
 *              type: number
 *     responses:
 *       201:
 *         description: Updated
 */
router.put('/:id', async (req, res) => {
	const score = req.body.score ?? null;
	const credits = req.body.credits ?? null;
	const response = await updateScoreCredits(req.params.id, score, credits);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /scorecredits/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The scorecredits ID.
 *     description: Delete a scorecredits by id
 *     responses:
 *       200:
 *         description: Deletes requested scorecredits
 */
router.delete('/:id', async (req, res) => {
	const response = await removeScoreCredits(req.params.id);
	try {
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(response);
	}
});

module.exports = router;
