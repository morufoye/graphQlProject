import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {SmartQBaseEntity} from "./base/base.entity";

@ObjectType()
@Entity('courses_assignment')
export class CourseAssignmentEntity extends BaseEntity{

    @Field( { nullable: false })
    @PrimaryColumn()
    code: string;

    @Field(() => String)
    @Column({ nullable: true })
    classAssigned: string;

    @Field(() => String)
    @Column({ nullable: true })
    student: string;

    @Field(() => String)
    @Column({ nullable: true })
    teacher: string;
}