import {Field, InputType} from "type-graphql";
import {Column} from "typeorm";

@InputType()

export class TeacherAnswerReg {
    @Field( { nullable: true })
    userId: string;

    @Field( { nullable: true })
    assessment_id: string;

    @Field( { nullable: true })
    answer_detail: string
}