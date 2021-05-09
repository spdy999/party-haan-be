import { Parties } from 'src/parties/parties.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Index(['partyId', 'userId'], { unique: true })
export class PartiesUsers extends BaseEntity {
  constructor(partial?: Partial<PartiesUsers>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partyId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Parties, (party) => party.partiesUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'partyId' })
  party: Parties;

  @ManyToOne(() => User, (user) => user.partiesUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
