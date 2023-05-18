import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidateUsersAdminFiltersPipeDto } from '../../application/dto/create-user.dto';
@Injectable()
export class ValidateUsersAdminFiltersPipe implements PipeTransform {
    transform(qs: ValidateUsersAdminFiltersPipeDto, metadata: ArgumentMetadata) {
        const toReturn: any = {}
        if (qs.status != null && qs.status != undefined && qs.status != 'null' && qs.status != 'undefined') {
            toReturn.status = qs.status
        } else {
            toReturn.status = null;
        }
        if (qs.role != null && qs.role != undefined && qs.role != 'null' && qs.role != 'undefined') {
            toReturn.role = qs.role
        } else {
            toReturn.role = null;
        }
        toReturn.limit = parseInt(qs.limit+'');
        toReturn.page = parseInt(qs.page+'');
        return toReturn;
    }
}
