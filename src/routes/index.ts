import { Express, json } from 'express';
import cors from 'cors';
import todo from './todo';

export default function (app: Express) {
	app.use(cors());
	app.use(json());
	app.use('/api/todos', todo);
}
