/* eslint-disable prettier/prettier */

import {
    PipeTransform,
    Injectable,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
    transform(value: string): number {
        const id = Number(value);

        if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(
                'Invalid ID. ID must be a positive integer.',
            );
        }

        return id;
    }
}
