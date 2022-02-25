import {Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, PrimaryColumn, BaseEntity} from 'typeorm';
import {Field, ObjectType} from "type-graphql";
import {SmartQBaseEntity} from "./base.entity";
@Entity('question_archive')


export class QuestionArchive extends BaseEntity {

    @Field( { nullable: false })
    @PrimaryColumn()
    question_id: string;

    @Field(() => String)
    @Column({nullable: true})
    created_on: Date;

    @Field(() => String)
    @Column({nullable: true})
    created_by: string;

    @Field(() => String)
    @Column({nullable: true})
    question_detail: string;
}