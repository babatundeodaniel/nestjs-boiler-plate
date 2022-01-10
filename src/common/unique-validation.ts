import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    // console.log('error', args);

    const entity = args.object[`class_entity_${args.property}`];
    // console.log('entity', entity);
    if (entity) {
      return getManager()
        .count(entity, { [args.property]: value })
        .then((count) => count < 1);
    } else {
      return true;
    }
  }
}

export function UniqueOnDatabase(
  // eslint-disable-next-line @typescript-eslint/ban-types
  entity: Function,
  validationOptions?: ValidationOptions,
) {
  validationOptions = {
    ...{ message: '$value already exists for $property. Choose another.' },
    ...validationOptions,
  };
  
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    console.log('entity 1', propertyName);
    object[`class_entity_${propertyName}`] = entity;
    console.log('obj', object);
    
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
