import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@ObjectType()
@Entity("courses")
export class CourseEntity extends BaseEntity {

    @Field( { nullable: false })
    @PrimaryColumn()
    code: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    title: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    description: string;
}