const Todo = require("../models/todo");

exports.createTodo = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        const todo = await Todo.create({ title, content });
        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
}

exports.getAllTodos = async (req, res, next) => {
    try {
        const todos = await Todo.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}

exports.getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}

exports.updateTodo = async (req, res, next) => {
    try {
        const { title, content, completed } = req.body;
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        if (title !== undefined) todo.title = title;
        if (content !== undefined) todo.content = content;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        next(error);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const rows = await Todo.destroy({ where: {id: req.params.id } });
        if (rows === 0) {
            return res.status(404).json({ error: "Failed delete, todo not found" });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}