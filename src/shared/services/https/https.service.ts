import { Injectable } from "@nestjs/common";
import { IHttpService } from "./IhttpsService.interface";
import { HttpService } from "@nestjs/axios";


@Injectable()
export class HttpsService implements IHttpService {
    private url: string;
    constructor(private readonly httpService: HttpService) {
    }

    setUrl(url: string): void {
        this.url = url;
    }

    get(endpoint: string, params?: any, reqOpts?: any): Promise<any> {
        return this.httpService.get(`${this.url}/${endpoint}`, this.getHeaders(reqOpts, params)).toPromise();
    }

    post(endpoint: string, body: any, reqOpts?: any): Promise<any> {
        return this.httpService.post(`${this.url}/${endpoint}`, body, this.getHeaders(reqOpts)).toPromise();
    }

    put(endpoint: string, body: any, reqOpts?: any): Promise<any> {
        return this.httpService.put(`${this.url}/${endpoint}`, body, this.getHeaders(reqOpts)).toPromise();
    }

    delete(endpoint: string, reqOpts?: any): Promise<any> {
        return this.httpService.delete(`${this.url}/${endpoint}`, this.getHeaders(reqOpts)).toPromise();
    }

    patch(endpoint: string, body: any, reqOpts?: any): Promise<any> {
        return this.httpService.patch(`${this.url}/${endpoint}`, body, this.getHeaders(reqOpts)).toPromise();
    }

    getHeaders(reqOpts?: any, params?: any): any {
        if (!reqOpts) {
            reqOpts = {
                params: {},
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: "json"
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = {};
            for (let k in params) {
                reqOpts[k] = params[k];
            }
        }
        return reqOpts;
    }
}