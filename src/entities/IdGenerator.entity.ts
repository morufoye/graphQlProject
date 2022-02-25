import {SmartQBaseEntity} from "./base/base.entity";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity("id_generator")
export class IdGenerator extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field(() => String)
    @Column({ nullable: true })
    user_id: string;

    @Field(() => String)
    @Column({ nullable: true })
    assessment_id: string;

    @Field(() => String)
    @Column({ nullable: true })
    assignment_id: string;


}