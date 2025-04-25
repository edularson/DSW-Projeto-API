import { EntityRepository, getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

@EntityRepository(Product)
export default class ListProductService{
    public async execute() : Promise<Product[]>{
        const productsRepository = getCustomRepository(ProductRepository);
        const products = await productsRepository.find();
        return products;
    }
}