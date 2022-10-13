const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

function searchButton() {

    const searchVal = document.querySelector('.searchVal').value.trim();

    router.get('/'), (req, res) => {
        console.log('======================');
        Post.findAll({
            where: {
                title: { [Sequelize.Op.iLike]: '%' + searchVal + '%' }
            },
            attributes: [
                'id',
                'post_content',
                'title',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
            ],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({ plain: true }));

                res.render('search', {
                    posts,
                    loggedIn: req.session.loggedIn
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    };

}

document.querySelector('.searchBtn').addEventListener('submit', searchButton)