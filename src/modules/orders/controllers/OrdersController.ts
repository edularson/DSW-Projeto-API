import { Request, Response, NextFunction } from "express";
import ListOrderService from "../services/ListOrderService";
import ShowOrderService from "../services/ShowOrderService";
import CreateOrderService from "../services/CreateOrderService";


export default class ProductsController{
    
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const listOrders = new ListOrderService();
            const orders = await listOrders.execute();
            return response.json(orders);
        }catch(err){
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = request.params;
            const showOrder = new ShowOrderService();
            const order = await showOrder.execute({id});
            return response.json(order);
        }catch(err){
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {customer_id, products} = request.body;
            const createOrder = new CreateOrderService();
            const order = await createOrder.execute({customer_id, products});
            return response.json(order);
        }catch(err){
            next(err);
        }
    }
}