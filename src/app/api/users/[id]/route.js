import { NextResponse } from "next/server";
import {
    User,
  } from "@/models";
  
  import {
    getDataFromToken,
  } from "@/helpers"
  
  import {
    databaseConnection,
  } from '@/config';

databaseConnection()

export const GET = async (request, { params }) => {  
  try {
        const userId = await getDataFromToken(request);
        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundProfile = await User.findOne({_id: params.id}).select("-password");

        if(!foundUser.isActive){
            return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
          }

        if(!foundUser.isAdmin && foundProfile._id !== foundUser._id){
            return NextResponse.json({error: "You must be the admin or the owner of this profile to be able to fetch it"}, {status: 400})
        }

        const response = NextResponse.json({
            message: "Profile found successfully",
            user: foundProfile,
        })

      return response;
  } catch (error) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}

export const PUT = async (request, { params }) => {
    const { fullName, email, profilePic, oldPassword, newPassword } = await request.json();
    
    try {
        const data = {
            fullName, 
            email, 
            profilePic,
        }
        let newProfileData = {...data}

        const userId = await getDataFromToken(request);
        const foundUser = await User.findOne({_id: userId});
        const foundProfile = await User.findOne({_id: params.id});

        if(!foundUser.isActive){
            return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
          }

        if(foundProfile._id !== foundUser._id){
            return NextResponse.json({error: "You must be the owner of this profile to be able to edit it"}, {status: 400})
        }

        //check if old password is correct
        const isPasswordValid = await bcryptjs.compare(oldPassword, foundProfile.password)
        if(!isPasswordValid){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        if(newPassword){
            //hash new password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(newPassword, salt)

            newProfileData = {...data, password: hashedPassword }
        }
        
        const updateUser = Article.findByIdAndUpdate(foundProfile._id, newProfileData)

        const response = NextResponse.json({
            message: "Article updated successfully",
            userId: updateUser._id,
        })

      return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

