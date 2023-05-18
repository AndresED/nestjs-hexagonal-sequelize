import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
            const configDatabase: any = {
                username: config.get('USERNAME_DB'),
                password: config.get('PASSWORD_DB'),
                database: config.get('DATABASE'),
                host: config.get('HOST_DATABASE'),
                dialect: config.get('DIALECT_DB'),
                port: parseInt(config.get('PORT_DB')),
                logging: config.get('LOGGING_DB'),
                entities: ['src/modules/**/domain/entities/*.entity.ts'], // La ubicación de tus archivos de entidad
            }
            const sequelize = new Sequelize(configDatabase);
            return sequelize;
        },
    },
];
