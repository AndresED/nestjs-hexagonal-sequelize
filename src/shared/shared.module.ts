import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SecurityService } from './security/security.service';
import { EmailService } from './services/email.service';
import { HttpsService } from './services/https/https.service';

@Module({
    providers: [
        EmailService,
        SecurityService,
        HttpsService,
    ],
    imports: [
        HttpModule,
    ],
    
    exports: [
        EmailService,
        SecurityService,
        HttpsService,
    ],
})
export class SharedModule { }
