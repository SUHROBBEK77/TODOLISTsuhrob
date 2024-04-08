import express from "express";
import { todos } from "../data";
import { faker } from "@faker-js/faker";
import { IEntity } from "types";

const router = express.Router();

/* GET LIST */
router.get("/", (req, res) => {
	res.send({ data: todos, message: null, ok: true });
});

/* GET SINGLE */

router.get("/:todoID", (req, res) => {
	const { todoID } = req.params;
	const todo = todos.find((t) => t.id === todoID);

	if (!todo)
		return res
			.status(404)
			.send({ data: null, message: `Todo not found with id ${todoID}`, ok: false });

	res.send({ data: todo, message: null, ok: true });
});

/* CREATE SINGLE */
router.post("/", (req, res) => {
	console.log("req = ", req);
	const todo: IEntity.Todo = {
		id: faker.string.uuid(),
		isCompleted: false,
		...req.body,
	};
	todos.push(todo);

	res.send({ data: todo, message: null, ok: true });
});

/* UPDATE SINGLE */
router.put("/:todoID", (req, res) => {
	const { todoID } = req.params;
	const todoIdx = todos.findIndex((t) => t.id === todoID);

	if (todoIdx === undefined)
		return res
			.status(404)
			.send({ data: null, message: `Todo not found with id ${todoID}`, ok: false });

	todos[todoIdx] = { ...todos[todoIdx], ...req.body };
	const todo = todos[todoIdx];

	res.send({ data: todo, message: null, ok: true });
});

/* DELETE SINGLE */
router.delete("/:todoID", (req, res) => {
	const { todoID } = req.params;
	const todoIdx = todos.findIndex((t) => t.id === todoID);

	if (todoIdx === undefined) {
		return res
			.status(404)
			.send({ data: null, message: `Todo not found with id ${todoID}`, ok: false });
	}

	const [todo] = todos.splice(todoIdx, 1); // [todo]
	res.send({ data: todo, message: null, ok: true });
});

export default router;