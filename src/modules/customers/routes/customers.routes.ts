import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controller/CustomersController";
import isAutenticated from "@shared/http/middlewares/isAuthenticated";

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAutenticated);

customersRouter.get('/', async (req, res, next) => {
    try {
        await customersController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

customersRouter.get('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await customersController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

customersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required()
    },
}), async (req, res, next) => {
    try {
        await customersController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

customersRouter.put('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required()
    },
}), async (req, res, next) => {
    try {
        await customersController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

customersRouter.delete('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await customersController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default customersRouter;