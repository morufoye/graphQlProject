import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {PrimaryKey} from "sequelize-typescript";

@ObjectType()
@Entity("job_applications")
export class JobApplicant extends BaseEntity {

    @Field( { nullable: false })
    @PrimaryColumn()
    email: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    name: string;


    @Field( { nullable: true })
    @Column({nullable: true})
    phone: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    address: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    major: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    qualification: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    resumeUrl: string;

}