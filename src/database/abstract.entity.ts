/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity{
  @PrimaryGeneratedColumn({unsigned:true, type:"integer"})
  id!: number;

  constructor() {}

  static createInstance<T>(entity: Partial<T>){
    const self = new AbstractEntity()
    Object.assign(self, entity)
    return self
  }
}
