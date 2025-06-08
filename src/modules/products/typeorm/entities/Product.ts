import OrdersProducts from "@modules/orders/typeorm/entities/OrdersProducts";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity('products')
export default class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(() => OrdersProducts, orders_products => orders_products.product)
    orders_products: OrdersProducts[];
    @Column()
    name: string;
    @Column('decimal')
    price: number;
    @Column('int')
    quantity: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}