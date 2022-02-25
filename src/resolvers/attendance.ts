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
}