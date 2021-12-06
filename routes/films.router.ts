import { Router } from "express";
import { getAllFilms, createFilm } from "../controllers/films.controller";
import { verify } from "../controllers/auth.controller";

const filmsRouter: Router = Router();

filmsRouter.get("/", getAllFilms);
filmsRouter.post("/", verify, createFilm);
filmsRouter.delete("/:id", verify);
filmsRouter.patch("/:id", verify);


export default filmsRouter;
