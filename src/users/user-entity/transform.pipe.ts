import { ValueTransformer } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class UUIDToNumberTransformer implements ValueTransformer {
  to(entityValue: string): string {
    return entityValue || uuidv4();
  }

  from(databaseValue: string): number {
    return parseInt(databaseValue.replace(/-/g, ''), 16);
  }
}
