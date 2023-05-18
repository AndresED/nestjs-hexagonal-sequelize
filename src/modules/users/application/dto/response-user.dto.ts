import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class UserDto{
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    recuperationCode: string;
    @ApiProperty()
    verificationCode: string;
    @ApiProperty()
    role?: string;
    @ApiProperty()
    created_at?: string;
    @ApiProperty()
    updated_at: string;
}
export class ResponseDetailUsersDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: UserDto,
    })
    data: UserDto;
}
export class ResponseCreateUsersDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: UserDto,
    })
    data: UserDto;
}
export class DataResponseDeleteUser {
    @ApiPropertyOptional({ default: 'user_deleted' })
    message: string;
}
export class ResponseDeleteUserDto {
    @ApiPropertyOptional({ default: 201 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseDeleteUser,
    })
    data: DataResponseDeleteUser;
}
export class DataResponseListUser {
    @ApiPropertyOptional({
        type: [UserDto],
    })
    result: UserDto[];
    @ApiPropertyOptional()
    count: number;
    @ApiPropertyOptional()
    pages: number;
}

export class ResponseListAddressDto {
    @ApiPropertyOptional({ default: 200 })
    statusCode: number;
    @ApiPropertyOptional()
    error: boolean;
    @ApiPropertyOptional({
        type: DataResponseListUser,
    })
    data: DataResponseListUser;
}
