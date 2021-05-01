import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Party extends BaseEntity {
  constructor(partial?: Partial<Party>) {
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
