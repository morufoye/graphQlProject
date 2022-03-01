import {
    Arg,
    Ctx,
    Query,
    Resolver,
    Mutation, Authorized, ObjectType, Field,
} from "type-graphql";
import {AttendanceRegister} from "../service/inputeType/attendance-register";
import {MyContext} from "../types";
import AttendanceService from "../service/attendance-svc";
import {StudentAssessmentAnswerEntity} from "../entities/studentAssessmentAnswer.entity";
import {Attendance} from "../entities/attendance.entity";

@Resolver()
export class AttendanceResolver {
     private readonly attendanceService = new AttendanceService();
    @Mutation(() => String, {nullable: true})
    async markAttendance(
        @Arg("userInput") userInput: AttendanceRegister,
        @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.attendanceService.markAttendance(userInput);
    }

    @Mutation(() => Attendance,{nullable: true})
    getDailyReport(
        @Arg("userId") userId: string,
        @Arg("report_date")report_date: string,
        @Ctx() { res }: MyContext
    ): Promise<Attendance  | undefined> {
        return  this.attendanceService.getDailyReport(userId, report_date);
    }
}