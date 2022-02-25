import {Field, InputType} from "type-graphql";
import {Column} from "typeorm";

@InputType()
export class ApplicantReg {

    @Field( { nullable: true })
    name: string;

    @Field( { nullable: true })
    email: string;

    @Field( { nullable: true })
    phone: string;

    @Field( { nullable: true })
    address: string;

    @Field( { nullable: true })
    major: string;

    @Field( { nullable: true })
    qualification: string;

    @Field( { nullable: true })
    resumeUrl: string;
}