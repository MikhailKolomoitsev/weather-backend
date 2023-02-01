import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { configService } from '../../config.service';
import { UserEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private secret: string;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    this.secret = configService.getJwtConfig().secret;
  }

  async googleLogin(req) {
    try {
      if (!req.user) {
        throw new Error('No user from google');
      }
      const { email } = req.user;
      let user = await this.usersRepository.findOneBy({ email });
      if (!user) {
        user = await this.usersService.createUser(email);
      }
      return {
        token: this.getJwtToken(user.id),
        errorMessage: '',
      };
    } catch (error) {
      return {
        token: '',
        errorMessage: error.message,
      };
    }
  }

  public getJwtToken(userId: string) {
    return this.jwtService.sign({ userId });
  }

  public async verifyToken(token: string) {
    if (!token) return {};
    try {
      return await this.jwtService.verifyAsync(token, { secret: this.secret });
    } catch (e) {
      throw new UnauthorizedException(e?.message);
    }
  }
}
