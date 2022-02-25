import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {SmartQBaseEntity} from "./base/base.entity";

@ObjectType()
@Entity('assignment')
export class AssignmentEntity extends BaseEntity {

    @Field( { nullable: false })
    @PrimaryColumn()
    assignment_id: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    assessment_id: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    assessment_detail: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    assignedBy: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    assignedTo: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    duration: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    courseCode: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    dateDue: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    created_on: Date;
}
