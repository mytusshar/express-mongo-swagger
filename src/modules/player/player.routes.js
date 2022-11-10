const express = require('express');
const router = express.Router();
const {
	addPlayer,
	getAllPlayers,
	getPlayerById,
	removePlayer,
	updatePlayer
} = require('./player.controller');

/**
 * @swagger
 * tags:
 *    - name: Player APIS
 * description: These are only for special users!
 */

/**
 * @swagger
 * /player:
 *   get:
 *     parameters:
 *      - in: query
 *        name: limit
 *        required: false
 *        type: number
 *        description: number of players per page.
 *      - in: query
 *        name: page
 *        required: false
 *        type: number
 *        description: page number.
 *     description: All player
 *     responses:
 *       200:
 *         description: Returns all players
 */
router.get('/', async (req, res) => {
	const response = await getAllPlayers(req.query.page, req.query.limit);
	if (response.success == true) {
		res.status(200).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /player/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The player ID.
 *     description: Get a player by id
 *     responses:
 *       200:
 *         description: Returns the requested player
 */
router.get('/:id', async (req, res) => {
	const response = await getPlayerById(req.params.id);
	res.json(response);
});

/**
 * @swagger
 * /player:
 *   post:
 *     parameters:
 *      - in: body
 *        name: player
 *        description: New player
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            score:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
	const body = {
		name: req.body.name,
		score: req.body.score
	};
	const response = await addPlayer(body);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /player/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The player ID.
 *      - in: body
 *        name: player
 *        description: Update player
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            score:
 *              type: number
 *     responses:
 *       201:
 *         description: Updated
 */
router.put('/:id', async (req, res) => {
	const name = req.body.name ?? null;
	const score = req.body.score ?? null;
	const response = await updatePlayer(req.params.id, name, score);

	if (response.success == true) {
		res.status(201).json(response);
	} else {
		res.status(404).json(response);
	}
});

/**
 * @swagger
 * /player/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The player ID.
 *     description: Delete a player by id
 *     responses:
 *       200:
 *         description: Deletes requested player
 */
router.delete('/:id', async (req, res) => {
	const response = await removePlayer(req.params.id);
	try {
		res.status(200).json(response);
	} catch (err) {
		res.status(500).json(response);
	}
});

module.exports = router;
