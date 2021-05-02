import { Parties } from 'src/parties/parties.entity';
import { User } from 'src/users/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PartiesUsers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Parties, (party) => party.partiesUsers)
  party: Parties;

  @ManyToOne(() => User, (user) => user.partiesUsers)
  user: User;
}
