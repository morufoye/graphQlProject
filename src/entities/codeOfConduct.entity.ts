import {SmartQBaseEntity} from "./base/base.entity";
import {BaseEntity, Column, Entity, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
@Entity("code_of_conduct_status")
export class CodeOfConductEntity extends BaseEntity{

    @Field( { nullable: false })
    @PrimaryColumn()
    userId: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    form_status: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    fullName: string;
}