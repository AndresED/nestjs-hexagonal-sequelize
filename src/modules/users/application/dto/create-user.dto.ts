import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserStatusEnum } from '../../../../shared/enum/user-status.enum';
import { Transform } from 'class-transformer';
import { UserRoleEnum } from '../../../../shared/enum/user-role.enum';
export class CreateUserDto {
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiProperty({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
    status?: string;
    recuperationCode?: string;
    verificationCode?: string;
    role?: string;
}


export class ValidateUsersFiltersPipeDto {
    @ApiProperty({
        required: false,
        enum:UserStatusEnum
    })
    @IsString()
    @IsOptional()
    status: string;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    limit: number;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    page: number;
}

export class ValidateUsersAdminFiltersPipeDto {
    @ApiProperty({
        required: false,
        enum:UserRoleEnum
    })
    @IsString()
    @IsOptional()
    role: string;
    @ApiProperty({
        required: false,
        enum:UserStatusEnum
    })
    @IsString()
    @IsOptional()
    status: string;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    limit: number;
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    page: number;
}