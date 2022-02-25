import {AttendanceRegister} from "./inputeType/attendance-register";
import {UserResponse} from "./responseType/user-response";
import {hash} from "bcryptjs";
import {User} from "../entities/user.entity";
import {Attendance} from "../entities/attendance.entity";

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
}