import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CityEntity } from './cities.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @OneToMany(() => CityEntity, (city) => city.user, {
    nullable: true,
    cascade: true,
  })
  cities?: CityEntity[];
}
