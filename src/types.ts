import {Field} from "type-graphql";
import { Request, Response } from "express";

export type UserLinkedRoles  = {
    roles : string[];
}


export type MyContext = {
    req: Request;
    res: Response;
    payload?: { userId: string, email: string };
};

export type UserLinkedEntity = {
    roles: string[];
};