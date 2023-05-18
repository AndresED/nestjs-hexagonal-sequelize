export interface IUsers{
    id: string;
    name: string;
    email: string;
    password: string;
    status: string;
    recuperationCode: string;
    verificationCode: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}


export interface IListUsers{
    result: IUsers[];
    count: number;
    pages: number;
}