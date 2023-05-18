import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class IHttpService {
    public abstract setUrl(url: string): void;
    public abstract get(endpoint: string, params?: any, reqOpts?: any): Promise<any>;
    public abstract post(endpoint: string, body: any, reqOpts?: any): Promise<any>;
    public abstract put(endpoint: string, body: any, reqOpts?: any): Promise<any>;
    public abstract delete(endpoint: string, reqOpts?: any): Promise<any>;
    public abstract patch(endpoint: string, body: any, reqOpts?: any): Promise<any>;
    public abstract getHeaders(reqOpts?: any, params?: any): any;
}