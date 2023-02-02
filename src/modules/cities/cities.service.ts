import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/users.entity';
import { CreateCityDto } from './dto/create-cty.dto';
import { CityEntity } from './entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private citiesRepository: Repository<CityEntity>,
  ) {}

  async createUsersCity(dto: CreateCityDto, user: UserEntity) {
    const { name } = dto;
    try {
      return await this.citiesRepository.save({ name, user });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
