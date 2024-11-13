import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

// * 0보다 큰 값인지 확인하는 커스텀 데코레이터
export function IsOverThanZero(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsOverThanZero',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Number(value) > 0;
        },
        defaultMessage() {
          return '0보다 큰 값이어야 합니다';
        },
      },
    });
  };
}
