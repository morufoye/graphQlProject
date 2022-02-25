import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {SmartQBaseEntity} from "./base/base.entity";

@ObjectType()
@Entity('teacher_assessment_answer')
export class TeacherAnswerEntity extends BaseEntity{

    @Field({nullable: false})
    @PrimaryColumn()
    assessment_id: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    userId: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    answer_detail: string

}