import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAutenticated from "../../../shared/http/middlewares/isAuthenticated";
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();

const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.patch('/avatar', isAutenticated,
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            await userAvatarController.update(req, res, next);
        } catch (err) {
            next(err);
        }
    });

usersRouter.get('/', isAutenticated, async (req, res, next) => {
    try {
        await usersController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }
}), async (req, res, next) => {
    try {
        await usersController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default usersRouter;