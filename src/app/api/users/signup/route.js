import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import {
  User,
} from "@/models";

import {
    isPasswordSafe,
} from "@/helpers"

import {
  databaseConnection,
} from '@/config';

databaseConnection()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {fullName, email, password, profilePic } = reqBody

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        // check if password is safe
        if(!isPasswordSafe(password)){
            return NextResponse.json({error: "password must contain at least one capital letter, a special symbol and a number"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            profilePic,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            userId: savedUser._id,
        })

        return response

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}