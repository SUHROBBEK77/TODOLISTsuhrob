import express from "express";
import routes from "./routes";

const app = express();

routes(app);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));