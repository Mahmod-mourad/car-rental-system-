import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Sale } from "./sale.entity"
import { Car } from "../../cars/entities/car.entity"

export enum ItemType {
  CAR = "car",
  ACCESSORY = "accessory",
  SERVICE = "service",
}

@Entity("sale_items")
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Sale,
    (sale) => sale.items,
    { onDelete: "CASCADE" },
  )
  @JoinColumn({ name: "saleId" })
  sale: Sale

  @Column()
  saleId: number

  @Column({ type: "enum", enum: ItemType })
  itemType: ItemType

  @ManyToOne(() => Car, { nullable: true })
  @JoinColumn({ name: "carId" })
  car: Car

  @Column({ nullable: true })
  carId: number

  @Column()
  itemName: string

  @Column({ type: "text", nullable: true })
  description: string

  @Column({ type: "decimal", precision: 10, scale: 2 })
  unitPrice: number

  @Column({ default: 1 })
  quantity: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalPrice: number
}
