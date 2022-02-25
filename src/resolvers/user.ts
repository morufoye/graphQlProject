import {
    Arg,
    Ctx,
    Query,
    Resolver,
    Mutation, Authorized, ObjectType, Field,
} from "type-graphql";
import {MyContext} from "../types";
import UserService from "../service/user-svc";
import {UserResponse} from "../service/responseType/user-response";
import {User} from "../entities/user.entity";
import {UserRegistration} from "../service/inputeType/user_reg";
import {ApplicantReg} from "../service/inputeType/ApplicantReg";
import {JobApplicant} from "../entities/applicant.entity";
import {CodeOfConductEntity} from "../entities/codeOfConduct.entity";


@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {

    private readonly userService = new UserService();

    @Query(() => User, {nullable: true})
    async me(@Ctx() @Ctx() {payload }: MyContext): Promise<User | undefined> {
        return this.userService.getUserFromPayload(payload)
    }

    @Query(() => [User], {nullable: true})
    //@Authorized(["USER"])
    async users(@Ctx() _: MyContext): Promise<User[] | undefined> {
        return this.userService.getAllUsers();
    }


    @Mutation(() => [User])
    getUsersNameId(
        @Arg("userId") userId: string,
        @Ctx() { res }: MyContext
    ): Promise<User[]  | undefined> {
        return  this.userService.getAllUsers();
    }

    @Mutation(() => [JobApplicant])
    getJobApplicants(
        @Arg("email") email: string,
        @Ctx() { res }: MyContext
    ): Promise<JobApplicant[]  | undefined> {
        return  this.userService.getJobApplicants();
    }



    @Mutation(() => User)
    getUserById(
        @Arg("userId") userId: string,
        @Ctx() { payload }: MyContext
    ): Promise<User | undefined> {
        return  this.userService.getUserByID(userId);
    }

    //
    // @Mutation(() => String, {nullable: true})
    // async markAttendance(
    //     @Arg("userInput") userInput: AttendanceRegister,
    //     @Ctx() {payload}: MyContext
    // ): Promise<String> {
    //     return this.attendanceService.markAttendance(userInput);
    // }


    @Mutation(() => UserResponse)
    login(
        @Arg("userId") userId: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<UserResponse> {
        return  this.userService.login(res, userId, password);
    }

    @Mutation(() => String)
    async updateClass(
        @Arg("userId") userId: string,
        @Arg("newClass") newClass: string,
        @Ctx() { res }: MyContext
    ): Promise<String> {
        return  this.userService.updateClass(userId, newClass, res);
    }

    @Mutation(() => String)
    async updatePassword(
        @Arg("userId") userId: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<String> {
        return  this.userService.updatePassword(userId, password, res);
    }

    @Mutation(() => String)
    async activateUser(
        @Arg("userId") userId: string,
        @Arg("active") active: string,
        @Ctx() { res }: MyContext
    ): Promise<String> {
        return  this.userService.activateUser(userId, active, res);
    }

    @Mutation(() => String)
    async updateConductDownloadStatus(
        @Arg("userId") userId: string,
        @Arg("status") form_status: string,
        @Arg("fullName") fullName: string,
        @Ctx() { res }: MyContext
    ): Promise<String> {
        return  this.userService.updateConductDownloadStatus(userId, form_status, fullName,  res);
    }

    @Mutation(() => CodeOfConductEntity)
    async getDownLoadStatus(
        @Arg("userId") userId: string,
        @Ctx() { res }: MyContext
    ): Promise<CodeOfConductEntity | undefined> {
        return  this.userService.getDownLoadStatus(userId);
    }

    @Mutation(() => String)
    async confirmOldPassword(
        @Arg("userId") userId: string,
        @Arg("password") password: string
    ): Promise<String> {
        return  this.userService.confirmOldPassword(userId, password);
    }

    @Query(() => User, {nullable: true})
    @Authorized()
    async getUserByEmail(@Ctx() {payload}: MyContext,
                         @Arg("email") email : string): Promise<User | undefined> {
        return this.userService.getUserByEmail(email);
    }


    @Mutation(() => UserResponse, {nullable: true})
    async registerParent(
        @Arg("userInput") userInput: UserRegistration,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return this.userService.registerParent(userInput);
    }

    @Mutation(() => String, {nullable: true})
    async registerJobApplicant(
        @Arg("userInput") userInput: ApplicantReg,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<String> {
        return this.userService.registerJobApplicant(userInput);
    }



    @Mutation(() => UserResponse, {nullable: true})
    async registerStudent(
        @Arg("userInput") userInput: UserRegistration,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return this.userService.registerStudent(userInput);
    }


    @Mutation(() => UserResponse)
    @Authorized(["ADMIN", "SUPER-ADMIN"])
    async addUserRole(
        @Arg("roles", () => [String]) roles: string[],
        @Arg("userId") userId: string,
        @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return  await this.userService.addUserRole(roles, userId);
    }



    @Mutation(() => UserResponse)
    @Authorized(["ADMIN", "SUPER-ADMIN"])
    async removeUserRole(
        @Arg("roles", () => [String]) roles: string[],
        @Arg("userId") userId: string,
        @Ctx() @Ctx() {payload}: MyContext
    ): Promise<UserResponse> {
        return  await this.userService.removeUserRole(roles, userId);
    }

}
