const express = require('express');
const router = express.Router();

let users = []; // in-memory store

// GET /users
router.get('/', (req, res) => res.json(users));

// POST /users
router.post('/', (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body);
  res.json(user);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.status(204).end();
});

module.exports = router;
