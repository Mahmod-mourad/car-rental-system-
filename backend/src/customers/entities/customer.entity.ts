import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Sale } from "../../sales/entities/sale.entity"

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  city: string

  @Column({ nullable: true })
  country: string

  @Column({ nullable: true })
  dateOfBirth: Date

  @Column({ nullable: true })
  drivingLicenseNumber: string

  @Column({ nullable: true })
  drivingLicenseExpiry: Date

  @Column({ nullable: true })
  emergencyContactName: string

  @Column({ nullable: true })
  emergencyContactPhone: string

  @Column({ default: "active" })
  status: string

  @Column({ type: "text", nullable: true })
  notes: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Sale,
    (sale) => sale.customer,
  )
  sales: Sale[]

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
