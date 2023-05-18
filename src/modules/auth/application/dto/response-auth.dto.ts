import { ApiPropertyOptional } from "@nestjs/swagger";

export class DataResponseAuthLoginDto{
    @ApiPropertyOptional()
    accessToken: string;
}
export class ResponseAuthLoginDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseAuthLoginDto,
    })
    data: DataResponseAuthLoginDto;
}

export class ResponseRequestResetDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional()
    data: string;
}

export class ResponseSendCodeDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional()
    data: string;
}
export class DataResponsValidateCodeRegisterDto{
    @ApiPropertyOptional()
    accessToken: string;
}

export class ResponsValidateCodeRegisterDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({type: DataResponsValidateCodeRegisterDto})
    data: DataResponsValidateCodeRegisterDto;
}


export class DataResponsResetPasswordDto{
    @ApiPropertyOptional()
    accessToken: string;
}

export class ResponseResetPasswordDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({type: DataResponsResetPasswordDto})
    data: DataResponsResetPasswordDto;
}



export class DataResponseValidateForgotDto{
    @ApiPropertyOptional()
    accessToken: string;
}

export class ResponseValidateForgotDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({type: DataResponseValidateForgotDto})
    data: DataResponseValidateForgotDto;
}