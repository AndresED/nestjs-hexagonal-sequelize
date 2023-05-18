import { Users } from "../../domain/entities/user.entity";

export const UsersProvider = {
    provide: 'UsersRepository',
    useValue: Users,
};
