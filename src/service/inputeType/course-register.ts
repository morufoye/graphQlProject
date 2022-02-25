import {Field, InputType} from "type-graphql";

@InputType()

export class CourseCreateRegister {

    @Field(() => String)
    code: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;
}