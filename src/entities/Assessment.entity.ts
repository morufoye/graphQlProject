import {SmartQBaseEntity} from "./base/base.entity";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

@ObjectType()
@Entity("assessment_archive")
export class Assessment extends BaseEntity{

    @Field( { nullable: false })
    @PrimaryColumn()
    assessment_id: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    title: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    created_by: string;

    //@Field(() => GraphQLJSONObject, { nullable: true })
    @Field( { nullable: true })
    @Column({nullable: true})
    assessment_detail: string

}