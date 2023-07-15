const express = require('express')
const { Todo } = require('../mongo')
const router = express.Router()
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

router.get('/statistic', async (_, res) => {
  const added_todos = await redis.getAsync('added_todos')
  if (added_todos) {
    res.send({ added_todos })
  } else {
    res.send({ 'added_todos': "0"})
  }
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  const added_todos = await redis.getAsync('added_todos')
  if (added_todos) {
    await redis.setAsync('added_todos', Number(added_todos)+1)
  } else {
    await redis.setAsync('added_todos', 1)    
  }
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const update = {
    text: req.body.text,
    done: req.body.done,
  }
  const options = {
    new: true,
    // runValidators: true
  }
  const newTodo = await Todo.findByIdAndUpdate(req.todo._id, update, options)
  res.send(newTodo)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router
