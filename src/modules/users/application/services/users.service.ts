import { Injectable } from '@nestjs/common';
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../../infrastructure/repository/users.repository';
import { IUsersService } from '../../domain/interfaces/users.service.interface';
import { IListUsers } from '../../domain/interfaces/users.interface';

@Injectable()
export class UsersService implements IUsersService{
  constructor(
    private readonly usersRepository: UsersRepository
  ){}
  async create(createUserDto: CreateUserDto) { 
    try {
      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      return error;
    }
  }

  async findAll(qs: ValidateUsersFiltersPipeDto): Promise<IListUsers> {
    try {
      return await this.usersRepository.findAll(qs);
    } catch (error) {
      return error;
    }
  }

  async findAllAdmin(qs: ValidateUsersAdminFiltersPipeDto) : Promise<IListUsers>{
    try {
      return await this.usersRepository.findAll(qs);
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.usersRepository.findOne(id);
    } catch (error) {
      return error;
    }
  }
  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneByEmail(email);
    } catch (error) {
      return error;
    }
  }
  async findOneByUserIdAndVerificationCode(userId: string,verificationCode: string) {
    try {
      return await this.usersRepository.findOneByUserIdAndVerificationCode(userId,verificationCode);
    } catch (error) {
      return error;
    }
  }
  async findOneByEmailAndRecuperationCode(email: string, recuperationCode: string){
    try {
      return await this.usersRepository.findOneByEmailAndRecuperationCode(email,recuperationCode);
    } catch (error) {
      return error;
    }
  }
  async update(id: string, updateUserDto: Partial<UpdateUserDto>) {
    try {
      return await this.usersRepository.update(id,updateUserDto);
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.usersRepository.remove(id);
    } catch (error) {
      return error;
    }
  }
}
