import {BaseEntity, Column, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";
import {Field} from "type-graphql";
import {PrimaryKey} from "sequelize-typescript";

export class SmartQBaseEntity extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;
}