import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAutenticated from "@shared/http/middlewares/isAuthenticated";
import OrdersController from "../controllers/OrdersController";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAutenticated);

ordersRouter.get('/', async (req, res, next) => {
    try {
        await ordersController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

ordersRouter.get('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await ordersController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

ordersRouter.post('/', celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().required(),
        products: Joi.required()
    },
}), async (req, res, next) => {
    try {
        await ordersController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});


export default ordersRouter;