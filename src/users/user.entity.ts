import { PartiesUsers } from 'src/parties-users/parties-users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PartiesUsers, (partiesUsers) => partiesUsers.user, {
    onDelete: 'CASCADE',
  })
  partiesUsers: PartiesUsers[];
}
