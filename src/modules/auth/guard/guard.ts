import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../../users/entities/users.entity';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class Guard extends AuthGuard('jwt') {
  user: UserEntity;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const token = request.headers['authorization']?.split?.('Bearer ')[1];

    const { userId } = await this.authService.verifyToken(token);
    const user = await this.usersService.getById(userId);
    request['user'] = user;

    const canActivate = await super.canActivate(context);

    return canActivate && user ? true : false;
  }
}
