import {Field, ObjectType} from "type-graphql";
import {User} from "../../entities/user.entity";
import {FieldError} from "./field-error";
import {ParentStudent} from "../../entities/parentStudent.entity";

@ObjectType()
export class UserResponse {

    @Field(()=>[FieldError],{ nullable: true })
    errors?: [FieldError];

    @Field(()=> User,  { nullable: true })
    user?: User;

    @Field(()=>String, { nullable: true })
    accessToken?: string;

    @Field( () => ParentStudent, { nullable: true })
    parent_student?: ParentStudent;

}