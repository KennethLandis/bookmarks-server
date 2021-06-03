const express = require('express');
const {bookmarks} = require('../store')
const bookmarksRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger')
const {v4: uuid} = require('uuid')

bookmarksRouter
    .route('/bookmark')
    .get((req, res) => {
        res.send(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, description, rating} = req.body;

        if (!title) {
            logger.error('Title is required')
            return res.send(400).status('Title is required')
        }
        if (!url) {
            logger.error('url is required')
            return res.send(400).status('url is required')
        }
        if (!description) {
            logger.error('description is required')
            return res.send(400).status('description is required')
        }
        if (!rating) {
            logger.error('rating is required')
            return res.send(400).status('rating is required')
        }
        const id = uuid();
        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        };

        bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`)

        return res.status(201).location(`http://localhost:8000/bookmark/${id}`).json({id})
    })
bookmarksRouter
    .route('/bookmark/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(mark => mark.id == id);

        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res.status(404).send('Bookmark Not Found');
        }

        res.json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(mark => mark.id == id);

        if(bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res.status(404).send('Not found');
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.error(`Bookmark with id ${id} deleted.`);

        res.status(204).end();
    })

module.exports = bookmarksRouter;