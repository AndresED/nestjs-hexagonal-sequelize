import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { AuthLoginDto, AuthRequestDto, ResetPasswordDto } from '../../application/dto/auth.dto';
import { ResponseBadRequestError, ResponseError500 } from '../../../../shared/dtos/responses.dto';
import { 
    ResponsValidateCodeRegisterDto, 
    ResponseAuthLoginDto, 
    ResponseRequestResetDto, 
    ResponseResetPasswordDto, 
    ResponseSendCodeDto,
    ResponseValidateForgotDto, 
} from '../../application/dto/response-auth.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({
    type: ResponseBadRequestError,
    status: 400,
    description:
        'Errores relacionados a las validaciones de la información enviada al api',
})
@ApiResponse({
    type: ResponseError500,
    status: 500,
    description: 'Error inesperado en el servidor',
})
export class AuthController {
    constructor(private readonly nameService: AuthService) { }
    // Login de un usuario
    @Post()
    @ApiResponse({
        type: ResponseAuthLoginDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Permite realizar el login de un usuario del sistema.' })
    async auth(@Body() body: AuthLoginDto) {
        return await this.nameService.auth(body.email, body.password);
    }
    // Solicitud de recuperación de contraseña
    @Post('request-reset')
    @ApiResponse({
        type: ResponseRequestResetDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Inicia el proceso de recuperación de contraseña mediante el envio de un email' })
    async request(@Body() body: AuthRequestDto) {
        return await this.nameService.requestPassword(body.email);
    }

    // Validar codigo generado por usuario para el reset password
    @Get('validate-code-forgot/:email/:code')
    @ApiResponse({
        type: ResponseValidateForgotDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Valida el codigo de recuperación de contraseña generado por el sistema.' })
    async validateCode(@Param('code') code: string, @Param('email') email: string) {
        return await this.nameService.validateCodeForgot(code, email);
    }
    @Get('send-code/:email/:typeSend')
    @ApiResponse({
        type: ResponseSendCodeDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Valida el codigo de recuperación de contraseña generado por el sistema.' })
    async sendCode(@Param('email') email: string, @Param('typeSend') typeSend: string) {
        return await this.nameService.sendCode(email, typeSend);
    }
    @Get('validate-code-register/:userId/:code')
    @ApiResponse({
        type: ResponsValidateCodeRegisterDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Valida el codigo de recuperación de contraseña generado por el sistema.' })
    async validateCodeRegister(@Param('code') code: string, @Param('userId') userId: string) {
        return await this.nameService.validateCodeRegister(code, userId);
    }
    // Actualizar la contraseña
    @Post('reset-password')
    @ApiResponse({
        type: ResponseResetPasswordDto,
        status: 201,
        description: 'Respuesta exitosa',
    })
    @ApiOperation({ summary: 'Actualiza la contraseña de un usuario' })
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.nameService.resetPassword(body.userId, body.password);
    }
}