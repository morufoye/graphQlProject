import {Field, InputType} from "type-graphql";

@InputType()

export class AssessmentUpload {
    @Field(() => String)
    title: string;

    @Field(() => String)
    created_by: string;

    @Field(() => String)
    assessment_detail: string;
}