import {Field, ObjectType} from "type-graphql";
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    ObjectIdColumn,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {SmartQBaseEntity} from "./base/base.entity";
import {User} from "./user.entity";
import {AssignmentEntity} from "./assignment.entity";

@ObjectType()
@Entity('student_assessment_answer')
export class StudentAssessmentAnswerEntity extends BaseEntity {

    @Field(() => String)
    @ObjectIdColumn()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    assignment_id: string;

    @Field({nullable: true})
    @Column({nullable: true})
    userId: string;

    @Field({nullable: true})
    @Column({nullable: true})
    assessment_id: string;

    @Field({nullable: true})
    @Column({nullable: true})
    answer_detail: string

    @Field({nullable: true})
    @Column({nullable: true})
    question_type: string

    @Field({nullable: true})
    @Column({nullable: true})
    total_score: string

    @Field({nullable: true})
    @Column({nullable: true})
    assigned_by: string

    @Field({nullable: true})
    @Column({nullable: true})
    assessment_detail: string

    @Field({nullable: true})
    @Column({nullable: true})
    course_code: string

    @Field({nullable: true})
    @OneToOne(() => User)
    @JoinColumn({name: "userId"})
    user: User

}