import { PartiesUsers } from 'src/parties-users/parties-users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => PartiesUsers, (partiesUsers) => partiesUsers.party, {
    onDelete: 'CASCADE',
  })
  partiesUsers: PartiesUsers[];
}
