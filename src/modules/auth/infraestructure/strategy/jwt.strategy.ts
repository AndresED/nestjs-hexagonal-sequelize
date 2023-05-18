import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUsers } from '../../../users/domain/interfaces/users.interface';
import { UsersService } from '../../../users/application/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {      
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });    
  }
  async validate(payload: IUsers): Promise<IUsers> { 
    const { email } = payload;
    const user = await this.usersService.findOneByEmail(email);  
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}