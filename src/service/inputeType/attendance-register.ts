import {Field, InputType} from "type-graphql";

@InputType()

export class AttendanceRegister {
    @Field(() => String)
    userId: string;
    @Field(() => String)
    comment: string;
    @Field(() => String)
    other_comment: string;
    @Field(() => String)
    adaab: string;
    @Field(() => String)
    hifz: string;
    @Field(() => String)
    murajah: string;
}