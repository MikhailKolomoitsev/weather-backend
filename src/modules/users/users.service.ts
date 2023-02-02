import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(email: string) {
    try {
      const user = this.usersRepository.create({
        email,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: string) {
    if (!id) {
      return null;
    }
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProfile(email: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
        relations: {
          cities: true,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
