import {Entity, Column, BaseEntity, PrimaryColumn, ObjectIdColumn, PrimaryGeneratedColumn} from 'typeorm';
import {SmartQBaseEntity} from './base/base.entity';
import {validate, IsNotEmpty, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max} from 'class-validator';
import {Field, FieldResolver, ObjectType, Root} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import {UserLinkedRoles} from "../types";
import {PrimaryKey} from "sequelize-typescript";

@ObjectType()
@Entity('user')
export class User extends BaseEntity {

  @Field( { nullable: false })
  @PrimaryColumn()
  userId: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  password: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  name: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  address: string;

  @Field()
  @Column({unique: true})
  email?: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  dob: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  mobileNumber: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column('json')
  linked_roles: UserLinkedRoles

  @Field( { nullable: true })
  @Column({nullable: true})
  role: string;


  @Field( { nullable: true })
  @Column({nullable: true})
  gender: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  class: string;

  @Field( { nullable: true })
  @Column({nullable: true})
  active: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

}
