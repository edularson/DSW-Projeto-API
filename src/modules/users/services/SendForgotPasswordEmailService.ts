import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRespository";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokensRepositoy = getCustomRepository(UserTokensRepository);
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('User does not exist.');
        }
        const { token } = await userTokensRepositoy.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: $(token)`
        })
    }
}