import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import uploadConfig from "@config/upload";
import path from "path";
import fs from 'fs';
import User from "@modules/users/typeorm/entities/User";

interface IRequest{
    user_id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatarService{

    public async execute({user_id, avatarFileName} : IRequest) : Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found');
        }
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.save(user);
        return user;
    }
}