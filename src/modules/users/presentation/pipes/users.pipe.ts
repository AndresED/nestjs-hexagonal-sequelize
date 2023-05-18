import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidateUsersFiltersPipeDto } from '../../application/dto/create-user.dto';
@Injectable()
export class ValidateUsersFiltersPipe implements PipeTransform {
    transform(qs: ValidateUsersFiltersPipeDto, metadata: ArgumentMetadata) {
        const toReturn: any = {}
        if (qs.status != null && qs.status != undefined && qs.status != 'null' && qs.status != 'undefined') {
            toReturn.status = qs.status
        } else {
            toReturn.status = null;
        }
        toReturn.limit = parseInt(qs.limit+'');
        toReturn.page = parseInt(qs.page+'');
        return toReturn;
    }
}
