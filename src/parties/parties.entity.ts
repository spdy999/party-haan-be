import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parties extends BaseEntity {
  constructor(partial?: Partial<Parties>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  imgUrl: string;

  @Column()
  capacity: number;
}
