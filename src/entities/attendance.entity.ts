import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('daily_report')
export class Attendance extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    userId: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    report_date: Date;

    @Field( { nullable: true })
    @Column({nullable: true})
    comment: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    other_comment: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    adaab: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    hifz: string;

    @Field( { nullable: true })
    @Column({nullable: true})
    murajah: string;
}