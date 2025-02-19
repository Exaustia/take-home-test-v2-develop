import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: "🍔" })
  emoji: string;

  @Column({ default: "meat" })
  tag: string;
}
