import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsTruthy(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsTruthy',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AcceptTerms,
    });
  };
}

@ValidatorConstraint({ name: 'IsTruthy' })
export class AcceptTerms implements ValidatorConstraintInterface {
  validate(value: boolean, args: ValidationArguments) {
    if (value == false) {
      return false;
    } else {
      return true;
    }
  }
  defaultMessage(args: ValidationArguments) {
    return 'Terms must be accepted';
  }
}
