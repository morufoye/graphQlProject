import {AssessmentUpload} from "./inputeType/assessment";
import {Assessment} from "../entities/Assessment.entity";
import {AssignmentRegister} from "./inputeType/assignment-register";
import {AssignmentEntity} from "../entities/assignment.entity";
import {CourseCreateRegister} from "./inputeType/course-register";
import {CourseEntity} from "../entities/course.entity";
import {CourseAssignmentRegister} from "./inputeType/CourseAssignmentRegister";
import {CourseAssignmentEntity} from "../entities/CourseAssignment.entity";


export default class CoursesService {

    public async createCourse({code, title,  description} : CourseCreateRegister) {
        try {
            const result = await  CourseEntity.create({
                code,
                title,
                description
            }).save();
            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occured while creating course";
        }
    }

    public async assignCourse({code, classAssigned,  student, teacher} : CourseAssignmentRegister) {
        try {
            const result = await  CourseAssignmentEntity.create({
                code,
                classAssigned,
                student,
                teacher
            }).save();
            return "success";
        } catch(e) {
            console.log("Error message ", e.detail);
            return "an error occured while assigning course";
        }
    }

    public async getAllCourses(): Promise<CourseEntity[] | undefined>{
        const cousesObj= CourseEntity.find();
        return cousesObj;
    }
}