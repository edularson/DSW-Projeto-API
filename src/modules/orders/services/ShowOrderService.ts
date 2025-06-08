import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import AppError from "@shared/errors/AppError";
import Order from "../typeorm/entities/Order";

interface IRequest{
    id: string;
}

export default class ShowOrderService {
    public async execute({id} : IRequest): Promise<Order>{
        const orderRepository = getCustomRepository(OrdersRepository);
        const order = await orderRepository.findById(id);
        if(!order){
            throw new AppError('Order not find');
        }
        return order;
    }
}