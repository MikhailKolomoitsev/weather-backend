import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { UserEntity } from '../users/entities/users.entity';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-cty.dto';

@Controller('cities')
export class CitiesController {
  constructor(private citiesCervice: CitiesService) {}

  @Post()
  createUsersCity(@Body() dto: CreateCityDto, @CurrentUser() user: UserEntity) {
    return this.citiesCervice.createUsersCity(dto, user);
  }

  @Delete(':id')
  deleteCity(@Param('id') id: string) {
    return this.citiesCervice.deleteCity(id);
  }
}
