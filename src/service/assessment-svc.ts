import {AssessmentUpload} from "./inputeType/assessment";
import {Assessment} from "../entities/Assessment.entity";
import {IdGenerator} from "../entities/IdGenerator.entity";
import {AssignmentRegister} from "./inputeType/assignment-register";
import {AssignmentEntity} from "../entities/assignment.entity";
import {TeacherAnswerReg} from "./inputeType/teacher-answer-reg";
import {TeacherAnswerEntity} from "../entities/teacherAnswer.entity";
import {StudentAssessmentAnswerEntity} from "../entities/studentAssessmentAnswer.entity";

export default class AssessmentService {
    public async uploadAssessment({created_by,  assessment_detail, title} : AssessmentUpload) {
       const assessmentId = await this.generateAssessmentId();
       let rawData = ""
        rawData = assessment_detail.replace('\\', '');
        assessment_detail = rawData;
        try {
            const result = await  Assessment.create({
                assessment_id: assessmentId,
                created_by,
                assessment_detail,
                title
            }).save();
            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occured while uploading assessment";
        }
    }

    public async uploadTeacherAnswer(userId: string, assessment_id: string, answer_detail:string) {
       try {
            const result = await  TeacherAnswerEntity.create({
                userId,
                assessment_id,
                answer_detail,
            }).save();
            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occurred while uploading teacher answer";
        }
    }

    public async uploadStudentAnswer(userId: string, assessment_id: string, answer_detail:string, question_type:string, assigned_by:string,  course_code:string, assignment_id:string, assessment_detail:string) {
        try {
            const result = await  StudentAssessmentAnswerEntity.create({
                userId,
                assessment_id,
                answer_detail,
                question_type,
                assigned_by,
                course_code,
                assignment_id,
                assessment_detail
            }).save();

            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occurred while uploading student answer";
        }
    }

    public async createAssignment({assessment_id,  assignedBy, assignedTo, duration, dateDue, courseCode} : AssignmentRegister) {
        const assignmentId = await this.generateAssignmentId();
        const assessmentDetail = await this.getAssignmentDetail(assessment_id);
        try {
            const result = await  AssignmentEntity.create({
                assessment_id,
                assignment_id : assignmentId,
                assignedBy,
                assignedTo,
                duration,
                dateDue,
                courseCode,
                assessment_detail:assessmentDetail?.assessment_detail
            }).save();


            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occured while creating assignment";
        }
    }

    public async getAllAssessments(): Promise<Assessment[] | undefined>{
        const assessmentObject= Assessment.find();
        return assessmentObject;
    }



    public async getStudentAssignment(): Promise<AssignmentEntity[] | undefined>{
        const assignmentObject= AssignmentEntity.find();
        return assignmentObject;
    }

    public async getAssignmentDetail( assessment_id: string): Promise<Assessment | undefined>{
        const assessmentObject =  await Assessment.findOne({assessment_id});
        return assessmentObject;
    }

    public async getAnswerDetail( assessment_id: string): Promise<TeacherAnswerEntity | undefined>{
        const res =  await TeacherAnswerEntity.findOne({assessment_id});
        return res;
    }

    public async getStudentAnswerDetail( assessment_id: string, userId: string): Promise<StudentAssessmentAnswerEntity | undefined>{
        const res =  await StudentAssessmentAnswerEntity.findOne({assessment_id, userId});
        return res
    }

    public async updateStudentAnswer(userId:string, assessment_id:string, assessment_detail:string, total_score:string): Promise<String | undefined>{
        const assessmentObject= StudentAssessmentAnswerEntity.update({userId : userId, assessment_id:assessment_id}, {assessment_detail:assessment_detail, total_score: total_score});
        return "success";
    }

    public async updateStudentScore(userId:string, assessment_id:string, total_score:string): Promise<String | undefined>{
        const assessmentObject= StudentAssessmentAnswerEntity.update({userId : userId, assessment_id:assessment_id}, {total_score: total_score});
        return "success";
    }

    public async loadSubmittedAssignmentsForTeacher(  assigned_by: string): Promise<StudentAssessmentAnswerEntity[] | undefined>{
        const res =  await StudentAssessmentAnswerEntity.find({ relations: ["user"] });
        return res
    }
// { relations: ["profile"] }

    public async generateAssessmentId() :Promise<string>{
        let curr_id = "ASS";
        const id = "idgenId1";
        let firstLastIdElement ;
        try {
            const last_id = await IdGenerator.findOne({ where: { id } });
            if (last_id) {
                firstLastIdElement = last_id.assessment_id;
            }
            let newIdElement = '0';
            if (firstLastIdElement) {
                newIdElement = firstLastIdElement + 1;
            }
            await IdGenerator.update({assessment_id : firstLastIdElement}, {assessment_id : newIdElement})
            let last_id_length = 0;
            if (firstLastIdElement) {
                last_id_length = firstLastIdElement.toString().length
            }
            const number_of_zeros_to_add = 6 - last_id_length;
            for (let i = 0; i < number_of_zeros_to_add; i++) {
                curr_id = curr_id + "0";
            }
        } catch(e) {
            console.log(e);
        }
        return curr_id + firstLastIdElement;
    }
    public async generateAssignmentId() :Promise<string>{
        let curr_id = "HW";
        const id = "idgenId1";
        let firstLastIdElement ;
        try {
            const last_id = await IdGenerator.findOne({ where: { id } });
            if (last_id) {
                firstLastIdElement = last_id.assignment_id;
            }
            let newIdElement = '0';
            if (firstLastIdElement) {
                newIdElement = firstLastIdElement + 1;
            }
            await IdGenerator.update({assignment_id : firstLastIdElement}, {assignment_id : newIdElement})
            let last_id_length = 0;
            if (firstLastIdElement) {
                last_id_length = firstLastIdElement.toString().length
            }
            const number_of_zeros_to_add = 6 - last_id_length;
            for (let i = 0; i < number_of_zeros_to_add; i++) {
                curr_id = curr_id + "0";
            }
        } catch(e) {
            console.log(e);
        }
        return curr_id + firstLastIdElement;
    }

}