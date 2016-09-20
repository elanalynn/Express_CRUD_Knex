var express = require('express')
var router = express.Router()
var db = require('../db/api')

router.get('/', function(req, res) {
  db.getAllUsers().then(users => {
    res.render('users/users', {users: users})
  })
})

router.get('/new', function(req, res) {
  res.render('users/new')
})

router.get('/:id', function(req, res) {
  db.getOneUser(req.params.id).then(user => {
    res.render('users/user', {user: user})
  })
})

router.post('/', function(req, res) {
  db.createOneUser(req.body).then(() => {
    res.redirect('/users')
  })
})

router.put('/:id', function(req, res) {
  db.updateOneUser(req.params.id, req.body).then(() => {
    res.json({'response': 'user updated'})
  })
})

router.delete('/:id', function(req, res) {
  db.deleteOneUser(req.params.id).then(() => {
    res.json({'response': 'user deleted'})
  })
})

router.get('/:id/edit', function(req, res) {
  db.getOneUser(req.params.id).then(user => {
    res.render('users/edit', {user: user})
  })

})

module.exports = router
