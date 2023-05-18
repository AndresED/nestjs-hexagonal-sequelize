import { IsUUID, IsDate, IsNumber, IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class AuthLoginDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class AuthSocialLoginDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    firstnames: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    lastnames: string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    uuid: string;
}

// tslint:disable-next-line: max-classes-per-file
export class PayloadJWTI {
    rolId: number;
    userId: string;
}

// tslint:disable-next-line: max-classes-per-file
export class AuthRequestDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    email: string;
}

// tslint:disable-next-line: max-classes-per-file
export class ValidateCodeDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    code: string;
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
}
// tslint:disable-next-line: max-classes-per-file
export class ResetPasswordDto{
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    userId: string;
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    password: string;
}