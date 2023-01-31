import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { configService } from '../../config.service';

const { domain } = configService.getAppConfig();

@Controller('google')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { token, errorMessage } = await this.authService.googleLogin(req);
    res.redirect(`${domain}?token=${token}&errorMessage=${errorMessage}`);
  }
}
