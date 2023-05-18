import { Injectable } from '@nestjs/common';
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { IListUsers, IUsers } from './users.interface';

@Injectable()
export abstract class IUsersRepository {
    abstract create(createUserDto: CreateUserDto): Promise<IUsers>
    abstract findAll(qs: ValidateUsersFiltersPipeDto): Promise<IListUsers>
    abstract findOne(id: string) : Promise<IUsers>
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<IUsers>
    abstract remove(id: string) : Promise<{ message: string }>
    abstract findAllAdmin(qs: ValidateUsersAdminFiltersPipeDto): Promise<IListUsers> 
}
