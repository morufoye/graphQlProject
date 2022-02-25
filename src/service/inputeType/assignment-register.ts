import {Field, InputType} from "type-graphql";

@InputType()
export class AssignmentRegister {

    @Field(() => String)
    assessment_id: string;

    @Field(() => String)
    assignedBy: string;

    @Field(() => String)
    assignedTo: string;

    @Field(() => String)
    duration: string;

    @Field(() => String)
    courseCode: string;

    @Field(() => String)
    dateDue: string;
}