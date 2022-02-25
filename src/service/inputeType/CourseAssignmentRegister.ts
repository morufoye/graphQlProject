import {Field, InputType} from "type-graphql";
import {Column} from "typeorm";

@InputType()
export class CourseAssignmentRegister {


    @Field(() => String)
    code: string;

    @Field(() => String)
    classAssigned: string;

    @Field(() => String)
    student: string;

    @Field(() => String)
    teacher: string;

}


