import { Injectable } from '@nestjs/common';
import { IUsers } from '../../../users/domain/interfaces/users.interface';

@Injectable()
export abstract class IAuthService {
    abstract auth(email: string, password: string): Promise<{accessToken: string;}>
    abstract createTokenUsers(payload: IUsers): Promise<string>
    abstract requestPassword(email: string): Promise<string>
    abstract sendCode(email: string, typeSend: string): Promise<string>
    abstract validateCodeForgot(code: string, email: string): Promise<{accessToken: string;}>
    abstract validateCodeRegister(code: string, userId: string): Promise<{accessToken: string;}>
    abstract resetPassword(userId, password) : Promise<{accessToken: string;}>
}
