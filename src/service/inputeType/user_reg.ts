import {Field, InputType} from "type-graphql";
import {Column} from "typeorm";
//import {UserLinkedRoles, UserLinkedStudents} from "../../types";

@InputType()
export class UserRegistration {

    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => String, {nullable: true})
    email: string;

    @Field(() => String, {nullable: true})
    mobileNumber: string;

    @Field(() => String, {nullable: true})
    password: string;

    @Field(() => String, {nullable: true})
    dob: string;

    @Field(() => String, {nullable: true})
    address: string;

    @Field(() => String, {nullable: true})
    role: string;

    @Field(() => String, {nullable: true})
    gender: string;

    // @Column('json')
    // linked_students: UserLinkedStudents;

    @Column('json')
    linked_roles : string[];

    @Field(() => String, {nullable: true})
    parent_id: string;

    ////
    // @Field()
    // dateOfBirth: string

}