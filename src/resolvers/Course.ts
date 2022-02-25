import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import CoursesService from "../service/courses-svc";
import {AssessmentUpload} from "../service/inputeType/assessment";
import {MyContext} from "../types";
import {CourseCreateRegister} from "../service/inputeType/course-register";
import {CourseAssignmentRegister} from "../service/inputeType/CourseAssignmentRegister";
import {AssignmentEntity} from "../entities/assignment.entity";
import {CourseEntity} from "../entities/course.entity";

@Resolver()
export class CourseResolver {
    private readonly courseService = new CoursesService();

    @Mutation(() => String)
    async createCourse(
        @Arg('userInput') userInput: CourseCreateRegister,
        @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.courseService.createCourse(userInput);
    }

    @Mutation(() => String)
    async assignCourse(
        @Arg('userInput') userInput: CourseAssignmentRegister,
        @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.courseService.assignCourse(userInput);
    }

    @Mutation(() => [CourseEntity])
    async getAllCourses(
        @Arg("code") code: string,
        @Ctx() { res }: MyContext
    ): Promise<CourseEntity[]  | undefined> {
        return  this.courseService.getAllCourses();
    }
}