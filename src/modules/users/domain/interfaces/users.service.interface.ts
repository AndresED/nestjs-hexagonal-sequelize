import { Injectable } from '@nestjs/common';
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { IListUsers } from './users.interface';

@Injectable()
export abstract class IUsersService {
    abstract create(createUserDto: CreateUserDto)
    abstract findAll(qs: ValidateUsersFiltersPipeDto): Promise<IListUsers>
    abstract findAllAdmin(qs: ValidateUsersAdminFiltersPipeDto) : Promise<IListUsers>
    abstract findOne(id: string) 
    abstract update(id: string, updateUserDto: UpdateUserDto)
    abstract remove(id: string) 
}
