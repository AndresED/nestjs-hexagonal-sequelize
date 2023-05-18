import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, DataType, Table, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { UserStatusEnum } from '../../../../shared/enum/user-status.enum';
import { UserRoleEnum } from '../../../../shared/enum/user-role.enum';

@Table({
    tableName: 'users'
})
export class Users extends Model<Users> {
    @ApiPropertyOptional()
    @Column({
        type: DataType.UUIDV4,
        defaultValue: () => {
            return uuidv4();
        },
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    public id: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'first_name',
    })
    name: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'email',
    })
    email: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'password',
    })
    password: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM(
            UserStatusEnum.ACTIVE,
            UserStatusEnum.UNACTIVE,
            UserStatusEnum.PENDING
        ),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'status',
        defaultValue: () => {
            return UserStatusEnum.PENDING;
        },
    })
    status: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'recuperation_code',
    })
    recuperationCode: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'verification_code',
    })
    verificationCode: string;
    @ApiPropertyOptional()
    @Column({
        type: DataType.ENUM(
            UserRoleEnum.USER,
            UserRoleEnum.ADMINISTRATOR,
        ),
        allowNull: true,
        validate: {
            notEmpty: false,
        },
        field: 'role',
    })
    role: string;
    @CreatedAt public created_at: Date;
    @UpdatedAt public updated_at: Date;
}