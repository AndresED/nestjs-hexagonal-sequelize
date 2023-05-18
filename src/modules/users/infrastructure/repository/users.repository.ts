import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { Users } from "../../domain/entities/user.entity";
import { CreateUserDto, ValidateUsersAdminFiltersPipeDto, ValidateUsersFiltersPipeDto } from "../../application/dto/create-user.dto";
import { UpdateUserDto } from "../../application/dto/update-user.dto";
import { IListUsers, IUsers } from "../../domain/interfaces/users.interface";
import { CountOptions, FindOptions, Op } from 'sequelize';
import { IUsersRepository } from "../../domain/interfaces/users.repository.interface";

@Injectable()
export class UsersRepository implements IUsersRepository{
    constructor(
        @Inject('UsersRepository') private readonly users: typeof Users
    ) { }
    async create(createUserDto: CreateUserDto): Promise<IUsers> {
        try {
            return this.users.create(createUserDto);
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findAll(qs: ValidateUsersFiltersPipeDto): Promise<IListUsers> {
        const { limit } = qs;
        const query = this.buildQuery(qs);
        const counter = await this.users.findAndCountAll(query.querybaseCount);
        const result = await this.users.findAll(query.querybase);
        const pages: number = Math.ceil(counter.count / limit);
        return {
            result,
            count: counter.count,
            pages,
        };
    }

    async findAllAdmin(qs: ValidateUsersAdminFiltersPipeDto): Promise<IListUsers> {
        const { limit } = qs;
        const query = this.buildQueryAdmin(qs);
        const counter = await this.users.findAndCountAll(query.querybaseCount);
        const result = await this.users.findAll(query.querybase);
        const pages: number = Math.ceil(counter.count / limit);
        return {
            result,
            count: counter.count,
            pages,
        };
    }


    async findOne(id: string): Promise<IUsers> {
        try {
            const result: any = await this.users.findOne({
                where: {
                    id,
                },
            });
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return result;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async findOneByEmail(email: string): Promise<IUsers> {
        try {
            const result: any = await this.users.findOne({
                where: {
                    email,
                },
            });
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return result;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async findOneByUserIdAndVerificationCode(userId: string, verificationCode: string): Promise<IUsers> {
        try {
            const result: any = await this.users.findOne({
                where: {
                    id: userId,
                    verificationCode
                },
            });
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return result;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async findOneByEmailAndRecuperationCode(email: string, recuperationCode: string): Promise<IUsers> {
        try {
            const result: any = await this.users.findOne({
                where: {
                    email,
                    recuperationCode
                },
            });
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return result;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<IUsers> {
        try {
            const existElement = await this.users.findOne({ where: { id } });
            if (!existElement) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            await this.users.update(updateUserDto, {
                where: {
                    id,
                }
            });
            const response = await this.findOne(id);
            return response;
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: string): Promise<{ message: string }> {
        try {
            const result = await this.users.findOne({ where: { id } })
            if (!result) {
                throw new HttpException({ message: 'user_not_found' }, HttpStatus.NOT_FOUND)
            }
            await this.users.destroy({
                where: {
                    id,
                },
            });
            return { message: 'user_deleted' }
        } catch (error) {
            Logger.error(error);
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    } 
    private buildQuery(qs: ValidateUsersFiltersPipeDto): { querybase: FindOptions, querybaseCount: CountOptions } {
        try {
            const { limit, page, status } = qs;
            const wheres = [];
            const querybase: FindOptions = {};
            const offset: number = (page - 1) * limit;
            if (status) {
                const data = {
                    status
                };
                wheres.push(data);
            }
            querybase.where = {
                [Op.and]: wheres,
            };
            const querybaseCount: CountOptions = querybase;
            querybase.limit = parseInt(limit + '');
            querybase.offset = offset;
            querybaseCount.distinct = true;
            return {
                querybase,
                querybaseCount
            };
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    private buildQueryAdmin(qs: ValidateUsersAdminFiltersPipeDto): { querybase: FindOptions, querybaseCount: CountOptions } {
        try {
            const { limit, page, status, role } = qs;
            const wheres = [];
            const querybase: FindOptions = {};
            const offset: number = (page - 1) * limit;
            if (status) {
                const data = {
                    status
                };
                wheres.push(data);
            }
            if (role) {
                const data = {
                    role
                };
                wheres.push(data);
            }
            querybase.where = {
                [Op.and]: wheres,
            };
            const querybaseCount: CountOptions = querybase;
            querybase.limit = parseInt(limit + '');
            querybase.offset = offset;
            querybaseCount.distinct = true;
            return {
                querybase,
                querybaseCount
            };
        } catch (error) {
            throw new HttpException(
                { message: error.message },
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}