import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {AssessmentUpload} from "../service/inputeType/assessment";
import {MyContext} from "../types";
import AssessmentService from "../service/assessment-svc";
import {User} from "../entities/user.entity";
import {Assessment} from "../entities/Assessment.entity";
import {AssignmentRegister} from "../service/inputeType/assignment-register";
import {AssignmentEntity} from "../entities/assignment.entity";
import {TeacherAnswerEntity} from "../entities/teacherAnswer.entity";
import {StudentAssessmentAnswerEntity} from "../entities/studentAssessmentAnswer.entity";

@Resolver()
export class AssessmentResolver {
   private readonly assessmentService = new AssessmentService();
    @Mutation(() => String)
    async uploadAssessment(
        @Arg('userInput') userInput: AssessmentUpload,
        @Ctx() {payload}: MyContext
): Promise<String> {
    return this.assessmentService.uploadAssessment(userInput);
}

    @Mutation(() => String)
    async uploadTeacherAnswer(
        @Arg('userId') userId: string,
        @Arg('assessment_id') assessment_id: string,
        @Arg('answer_detail') answer_detail: string,
        @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.assessmentService.uploadTeacherAnswer(userId,assessment_id,answer_detail);
    }

    @Mutation(() => String)
    async uploadStudentAnswer(
        @Arg('userId') userId: string,
        @Arg('assessment_id') assessment_id: string,
        @Arg('answer_detail') answer_detail: string,
        @Arg('question_type') question_type: string,
        @Arg('assigned_by')assigned_by: string,
        @Arg('course_code')course_code: string,
        @Arg('assignment_id')assignment_id: string,
        @Arg('assessment_detail')assessment_detail: string,
        @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.assessmentService.uploadStudentAnswer(userId,assessment_id,answer_detail, question_type, assigned_by,  course_code, assignment_id, assessment_detail);
    }

    @Mutation(() => [Assessment])
    getAssignments(
        @Arg("assessmentId") assessment_id: string,
        @Ctx() { res }: MyContext
    ): Promise<Assessment[]  | undefined> {
        return  this.assessmentService.getAllAssessments();
    }

    @Mutation(() => [AssignmentEntity])
    getStudentAssignment(
        @Arg("assignmentId") assignmentId: string,
        @Ctx() { res }: MyContext
    ): Promise<AssignmentEntity[]  | undefined> {
        return  this.assessmentService.getStudentAssignment();
    }

    @Mutation(() => Assessment)
    getAssignmentDetail(
        @Arg("assignmentId") assignment_id: string,
        @Ctx() { res }: MyContext
    ): Promise<Assessment  | undefined> {
        return  this.assessmentService.getAssignmentDetail(assignment_id);
    }

    @Mutation(() => TeacherAnswerEntity,{nullable: true})
    getAnswerDetail(
        @Arg("assessmentId") assessment_id: string,
        @Ctx() { res }: MyContext
    ): Promise<TeacherAnswerEntity  | undefined> {
        return  this.assessmentService.getAnswerDetail(assessment_id);
    }
//getAssignmentStatus
    @Mutation(() => StudentAssessmentAnswerEntity ,{nullable: true})
    getAssignmentStatus(
        @Arg("assessmentId") assessment_id: string,
        @Arg("userId") userId: string,
        @Ctx() { res }: MyContext
    ): Promise<StudentAssessmentAnswerEntity  | undefined> {
        return  this.assessmentService.getStudentAnswerDetail(assessment_id, userId);
    }

    @Mutation(() => String ,{nullable: true})
    updateStudentAnswer(
        @Arg("userId") userId: string,
        @Arg("assessment_id") assessment_id: string,
        @Arg("assessment_detail") assessment_detail: string,
        @Arg("total_score") total_score: string,
        @Ctx() { res }: MyContext
    ): Promise<String  | undefined> {
        return  this.assessmentService.updateStudentAnswer(userId, assessment_id, assessment_detail, total_score);
    }

    @Mutation(() => StudentAssessmentAnswerEntity,{nullable: true})
    getStudentAnswerDetail(
        @Arg("assessmentId") assessment_id: string,
        @Arg("userId") userId: string,
        @Ctx() { res }: MyContext
    ): Promise<StudentAssessmentAnswerEntity  | undefined> {
        return  this.assessmentService.getStudentAnswerDetail(assessment_id, userId);
    }

    @Mutation(() => [StudentAssessmentAnswerEntity] ,{nullable: true})
    loadSubmittedAssignmentsForTeacher(
        @Arg("assignedBy") assigned_by: string,
        @Ctx() { res }: MyContext
    ): Promise<StudentAssessmentAnswerEntity[]  | undefined> {
        return  this.assessmentService.loadSubmittedAssignmentsForTeacher(assigned_by);
    }

    @Mutation(() => String)
    createAssignment(
        @Arg("userInput") userInput: AssignmentRegister,
        @Ctx() { res }: MyContext
    ): Promise<String | undefined> {
        return  this.assessmentService.createAssignment(userInput);
    }

}