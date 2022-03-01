import {AttendanceRegister} from "./inputeType/attendance-register";
import {UserResponse} from "./responseType/user-response";
import {hash} from "bcryptjs";
import {User} from "../entities/user.entity";
import {Attendance} from "../entities/attendance.entity";
import {StudentAssessmentAnswerEntity} from "../entities/studentAssessmentAnswer.entity";
import {getRepository} from "typeorm";

export default class AttendanceService {
    public async markAttendance({userId, comment, other_comment, hifz, murajah, adaab} : AttendanceRegister){
        try {
            const user = await Attendance.create({
                userId,
                comment,
                other_comment,
                hifz,
                murajah,
                adaab
            }).save();
            return 'success';
        } catch (err) {
            console.log("Error message ", err.detail);
            return 'an error occurred while trying to mark attendance'
        }
    }

    public async getDailyReport( userId: string, report_date:string): Promise<Attendance | undefined>{
       // const res =  await Attendance.findOne({userId, report_date});
        var res = await getRepository(Attendance)
            .createQueryBuilder("daily_report")
            .where("daily_report.report_date like :date and daily_report.userId like :userId", { date:`%${report_date}%`, userId : `%${userId}%` })
            .getOne();
        return res
    }
}