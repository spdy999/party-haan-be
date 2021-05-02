import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Parties } from '../parties/parties.entity';

@Entity()
export class PartiesUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parties, (party) => party.partiesUsers)
  party: Parties;

  @ManyToOne(() => User, (user) => user.partiesUsers)
  user: User;
}
