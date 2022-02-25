import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity("parent_student")
export class ParentStudent extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field(() => String)
    @Column({ nullable: true })
    student_id: string;

    @Field(() => String)
    @Column({ nullable: true })
    parent_id: string;

}