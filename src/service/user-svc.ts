import argon2 from "argon2";
import {UserResponse} from "./responseType/user-response";
import {Request, Response} from "express";
import { hash, compare } from "bcryptjs";
import {User} from "../entities/user.entity";
import {Authority} from "../entities/authority.entity";
import {sendRefreshToken} from "../authentication/sendRefreshToken";
import {createAccessToken, createRefreshToken} from "../authentication/auth";
import AuthorityService from "./authority-svc";
import {UserRegistration} from "./inputeType/user_reg";
import {IdGenerator} from "../entities/IdGenerator.entity";
import {ParentStudent} from "../entities/parentStudent.entity";
import {JobApplicant} from "../entities/applicant.entity";
import {ApplicantReg} from "./inputeType/ApplicantReg";
import {CodeOfConductEntity} from "../entities/codeOfConduct.entity";


export default class UserService {

    private readonly authorityService = new AuthorityService();

    public async getAllUsers(): Promise<User[] | undefined>{
       return User.find();
    }

    public async getJobApplicants(): Promise<JobApplicant[] | undefined>{
        return JobApplicant.find();
    }


    public async getDownLoadStatus( userId: string): Promise<CodeOfConductEntity | undefined>{
       const user =  await CodeOfConductEntity.findOne({ userId });
       return  user;
    }

    public async getUserByEmail( email: string): Promise<User | undefined>{
        const user =  await User.findOne({ email });
        return  user;
    }

    public async getUserByID( userId: string): Promise<User | undefined>{
        const user =  await User.findOne({userId});

        return user;
    }

    public async getUserFromPayload( payload: any): Promise<User | undefined>{
        if (!payload?.email) {
            return undefined;
        }
        return  this.getUserByEmail(payload.email);
    }

    public async addUserRole(rolesIds: string[], id: string): Promise<UserResponse>{
        const roles = await this.authorityService.findRoles(rolesIds)
        const user =  await this.getUserByID(id)
        if(!user) {
            return { user: undefined};
        }
       // for (const role of roles) {
        //    const userRoles = user.linkedEntities.roles;
        //     if(this.getFind(userRoles, role)) {
        //         continue
        //     }
        //     userRoles.push(role.name);
        // }
        return { user: await user.save()};
    }

    private getFind(userRoles: string[], role: Authority) {
        return userRoles.find(r => r === role.name);
    }

    public async removeUserRole(rolesIds: string[], id: string): Promise<UserResponse>{
        const roles = await this.authorityService.findRoles(rolesIds)
        const user =  await this.getUserByID(id)
        if(!user) {
            return { user: undefined};
        }
        for (const role of roles) {
     //       user.linkedEntities.roles = user?.linkedEntities.roles.filter(r => r !== role.name);
        }
        return { user: await user.save()};
    }


    public async confirmOldPassword(userId: string, password: string) : Promise<string>{
        const user = await User.findOne({ where: { userId } });
        if (user) {
            const valid = await compare(password, user.password);
            if (valid) {
                return "success"
            }
        }
        return "failure"
    }

    public async login(res: Response, userId: string, password: string): Promise<UserResponse> {
        const user = await User.findOne({ where: { userId } });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "User Id doesn't exist",
                    },
                ],
            };
        }
        const valid = await compare(password, user.password);

        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Incorrect passwords",
                    },
                ],
            };
        }
        sendRefreshToken(res, createRefreshToken(user));
        return {
            accessToken: createAccessToken(user),
            user
        };
    }
    //public async registerParent(name: string, role: string, address: string, email: string, mobileNumber: string): Promise<UserResponse> {
    public async registerParent( {name, email, mobileNumber, address, role} : UserRegistration): Promise<UserResponse>{
        try {
            const hashedPassword = await hash("password", 12);
            const generatedId = await this.generateUserId();
            const user = await User.create({
                userId:generatedId,
                password: hashedPassword,
                name,
                email,
                mobileNumber,
                address,
                role,
                linked_roles: {roles : [role]}
            }).save()
            return {user};
        } catch (err) {
            console.log("Error message ", err.detail);
            return { errors: [ { field: err.detail,  message: err.detail,},],};
               }
          }
    //public async registerStudent(name: string, role: string, dob: string, address:string, email:string, mobileNumber:string, parent_id:string): Promise<UserResponse> {
    public async registerStudent( {name, dob, role, address, email, mobileNumber, gender, parent_id} : UserRegistration): Promise<UserResponse>{
        try {
            const hashedPassword = await hash(dob, 12);
            const generatedId = await this.generateUserId();
            const user = await User.create({
                userId:generatedId,
                password: hashedPassword,
                name,
                dob,
                address,
                email,
                mobileNumber,
                gender,
                role,
                linked_roles: {roles : [role]}
            }).save();
            await this.insertIntoParentStudent(parent_id, generatedId);
            return {user};
        } catch (err) {
            console.log("Error message ", err.detail);
            return {
                errors: [
                    {
                        field: err.detail,
                        message: err.detail,
                    },
                ]
            };
        }
    }

    public async registerJobApplicant( {name, phone, major, address, email, qualification, resumeUrl} : ApplicantReg): Promise<String>{
        try {
            const user = await JobApplicant.create({
               email,
                name,
                phone,
                address,
                qualification,
                major,
                resumeUrl,
            }).save();


            return "success";
        } catch (err) {
            console.log("Error message ", err.detail);
            return "error";
        }
    }

    public async updateClass( userId: string, newClass: string, res:Response) : Promise<string>{
        try {
    await User.update({userId : userId}, {class : newClass})
            return 'success';
        } catch (e) {
            console.trace()
            return 'error while updating user';
        }
    }

    public async updatePassword( userId: string, password: string, res:Response) : Promise<string>{
        const hashedPassword = await hash(password, 12);
        try {
            await User.update({userId : userId}, {password : hashedPassword})
            return 'success';
        } catch (e) {
            console.trace()
            return 'error while updating user';
        }
    }

    public async activateUser( userId: string, active: string, res:Response) : Promise<string>{
        try {
            await User.update({userId : userId}, {active : active})
            const user = await this.getUserByID(userId)
            if ('teacher' === user?.role) {
            if ('Y' === active) {
                await CodeOfConductEntity.create({
                    userId,
                    form_status : "not submitted"
                }).save();
            }
            }
            return 'success';
        } catch (e) {
            console.trace()
            return 'error while updating user';
        }
    }

    public async updateConductDownloadStatus( userId: string, form_status: string, fullName: string, res:Response) : Promise<string>{
        try {
            await CodeOfConductEntity.update({userId : userId}, {form_status : form_status, fullName: fullName})
            return 'success';
       } catch (e) {
            console.trace()
            return 'error while updating user';
        }
    }

    public async generateUserId() :Promise<string>{
        let curr_id = "ODU";
        const id = "idgenId1";
        let firstLastIdElement ;
        try {
            const last_id = await IdGenerator.findOne({ where: { id } });
        if (last_id) {
            firstLastIdElement = last_id.user_id;
        }
        let newIdElement = '0';
        if (firstLastIdElement) {
            newIdElement = firstLastIdElement + 1;
        }
        await IdGenerator.update({user_id : firstLastIdElement}, {user_id : newIdElement})
        let last_id_length = 0;
        if (firstLastIdElement) {
            last_id_length = firstLastIdElement.toString().length
        }
        const number_of_zeros_to_add = 6 - last_id_length;
        for (let i = 0; i < number_of_zeros_to_add; i++) {
            curr_id = curr_id + "0";
        }
        } catch(e) {
            console.trace()
            console.error(e);
            console.log("Error message from inside here ", e);
        }
        return curr_id + firstLastIdElement;
    }

    public async insertIntoParentStudent(parent_id: string, student_id: string): Promise<UserResponse> {
        try {
            const parent_student = await ParentStudent.create({
                parent_id,
                student_id
            }).save()
            return {parent_student};
        }catch (err) {
            console.log("Error message ", err.detail);
            return {
                errors: [
                    {
                        field: err.detail,
                        message: err.detail,
                    },
                ]
            };
        }
    }

}