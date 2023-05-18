import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../../../users/application/services/users.service';
import * as bcrypt from 'bcrypt';
import { UserStatusEnum } from '../../../../shared/enum/user-status.enum';
import { IUsers } from '../../../users/domain/interfaces/users.interface';
import { EmailService } from '../../../../shared/services/email.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../../domain/interfaces/auth.service.interface';
@Injectable()
export class AuthService implements IAuthService{
    constructor(
        private readonly usersService: UsersService,
        private readonly emailService: EmailService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }
    // LOGIN
    async auth(email: string, password: string): Promise<{accessToken: string;}> {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await this.usersService.findOneByEmail(email);
                if (!users) {
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (!bcrypt.compareSync(password, users.password)) {
                    throw new HttpException({ message: 'password_incorrect' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                if (users.status === UserStatusEnum.UNACTIVE) {
                    throw new HttpException({ message: 'user_disable' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const token = await this.createTokenUsers(users);
                resolve({
                    accessToken: token,
                });
            } catch (error) {
                Logger.error(error);
                reject(error);
            }
        });
    }
    // CREACIÓN DEL TOKEN DE SESIÓN
    async createTokenUsers(payload: IUsers): Promise<string> {
        try {
            const dataPayload = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
            }
            const options = {
                secret: this.configService.get('JWT_SECRET'),
            }
            const accessToken = await this.jwtService.sign(dataPayload, options);
            return accessToken;
        } catch (error) {
            Logger.error(error);
            return error;
        }
    }
    // Solicitud de recuperación de contraseña
    async requestPassword(email: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICAMOS QUE EL EMAIL INGRESADO EXISTA
                const dataUser = await this.usersService.findOneByEmail(email);
                if (!dataUser) {
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                // GENERO CODIGO Y URL
                const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                await this.usersService.update(dataUser.id, { recuperationCode: String(code) });
                // ENVIAMOS EL EMAIL DE RECUPERACION DE CONTRASEÑA
                this.emailService.sendEmail(
                    this.configService.get('SENGRID_ID_EMAIL_TEMPLATE_RESET_PASSWORD'),
                    {
                        name: 'Sengrid Team',
                        email,
                        code,
                    },
                    email,
                    this.configService.get('EMAIL_SENGRID_SEND'),
                    'Recuperation Password'
                );
                resolve('email_send');
            } catch (error) {
                reject(error);
            }
        });
    }
    // Solicitud de recuperación de contraseña
    async sendCode(email: string, typeSend: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICAMOS QUE EL EMAIL INGRESADO EXISTA
                const dataUser = await this.usersService.findOneByEmail(email);
                if (!dataUser) {
                    throw new HttpException({ message: 'email_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                let body;
                const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                if (typeSend == 'confirmation') {
                    body = {
                        verificationCode: code
                    }
                } else {
                    body = {
                        recuperationCode: code
                    }
                }
                await this.usersService.update(dataUser.id, body);
                // ENVIAMOS EL CODIGO DE ACTIVACIÓN
                this.emailService.sendEmail(
                    this.configService.get('SENGRID_ID_EMAIL_TEMPLATE_VALIDATION_CODE'),
                    {
                        name: `${dataUser.firstName} ${dataUser.lastName}`,
                        email,
                        code,
                    },
                    email,
                    this.configService.get('EMAIL_SENGRID_SEND'),
                    'Validation Code'
                );
                resolve('email_send');
            } catch (error) {
                reject(error);
            }
        });
    }

    // Verificación de codigo de solicitud de recuperación de contraseña
    async validateCodeForgot(code: string, email: string): Promise<{accessToken: string;}> {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICANDO QUE EL CODIGO DE RECUPERACIÓN EXISTA
                const dataUser = await this.usersService.findOneByEmailAndRecuperationCode(email, code);
                if (!dataUser) {
                    throw new HttpException({ message: 'code_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                const accessToken = await this.createTokenUsers(dataUser);
                resolve({
                    accessToken: accessToken,
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async validateCodeRegister(code: string, userId: string): Promise<{accessToken: string;}> {
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICANDO QUE EL CODIGO DE RECUPERACIÓN EXISTA
                const dataUser = await this.usersService.findOneByUserIdAndVerificationCode(userId, code);
                if (!dataUser) {
                    throw new HttpException({ message: 'code_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                await this.usersService.update(userId, { status: UserStatusEnum.ACTIVE });
                const accessToken = await this.createTokenUsers(dataUser);
                resolve({
                    accessToken: accessToken,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    // ACTUALIZACIÓN DE CONTRASEÑA
    async resetPassword(userId, password) : Promise<{accessToken: string;}>{
        return new Promise(async (resolve, reject) => {
            try {
                // VERIFICANDO QUE EL CODIGO EXISTA
                const dataUser = await this.usersService.findOne(userId);
                if (!dataUser) {
                    throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
                }
                // CIFRANDO NUEVA CONTRASEÑA
                const pwd = await bcrypt.hashSync(password, 10);
                // ACTUALIZANDO CONTRASEÑA Y SETEANDO A NULL EL CODIGO DE RECUPERACIÓN
                await this.usersService.update(dataUser.id, { password: pwd, recuperationCode: null });
                const accessToken = await this.createTokenUsers(dataUser);
                resolve({ accessToken });
            } catch (error) {
                reject(error);
            }
        });
    }
}
