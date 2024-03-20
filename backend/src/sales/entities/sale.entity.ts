import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Customer } from "../../customers/entities/customer.entity"
import { User } from "../../users/entities/user.entity"
import { SaleItem } from "./sale-item.entity"

export enum SaleStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
  FINANCING = "financing",
}

@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  saleNumber: string

  @ManyToOne(
    () => Customer,
    (customer) => customer.sales,
  )
  @JoinColumn({ name: "customerId" })
  customer: Customer

  @Column()
  customerId: number

  @ManyToOne(() => User)
  @JoinColumn({ name: "salesPersonId" })
  salesPerson: User

  @Column()
  salesPersonId: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subtotal: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxAmount: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discountAmount: number

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalAmount: number

  @Column({ type: "enum", enum: PaymentMethod })
  paymentMethod: PaymentMethod

  @Column({ type: "enum", enum: SaleStatus, default: SaleStatus.PENDING })
  status: SaleStatus

  @Column({ type: "text", nullable: true })
  notes: string

  @Column({ nullable: true })
  deliveryDate: Date

  @Column({ type: "text", nullable: true })
  terms: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => SaleItem,
    (saleItem) => saleItem.sale,
    { cascade: true },
  )
  items: SaleItem[]
}
