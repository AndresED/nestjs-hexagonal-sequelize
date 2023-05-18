import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class EmailService {

    constructor(
        @InjectSendGrid() private readonly sendgrid: SendGridService,
        private configService: ConfigService
    ) { }
    /**
     * Envia un correo personalizado
     * @param templateId id de la plantilla en sendgrid que se usará
     * @param data json con los datos para el binding de la plantilla con handlebars
     * @param to email al que le llegará el mensaje
     * @param from email del que envia el mensaje
     * @param subject asunto del correo
     */
    async sendEmail(
        templateId: string, 
        data: any, 
        to: string, 
        from: string, 
        subject: string
    ): Promise<boolean> {
        try {
            return await this.sendgrid.send({
                templateId,
                dynamicTemplateData: data,
                from,
                to,
                subject,
            }).then(() => {
                return true;
            }).catch(() => {
                return false;
            });
        } catch (error) {
            return false;
        }
    }
}
