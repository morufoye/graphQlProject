import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity("authority")
export class Authority extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    role: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    name: string;
}