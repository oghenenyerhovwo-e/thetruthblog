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

export const GET = async (request) => {
  const url  = new URL(request.url) 
  const searchText = url.searchParams.get("searchText")
  const pageIndex = url.searchParams.get("pageIndex")
  const pageLimit = url.searchParams.get("pageLimit")

  try {
    if(!searchText){
      return NextResponse.json({error: "no text"}, {status: 400})
    }
    
    const userId = await getDataFromToken(request);
    const foundUser = await User.findOne({_id: userId}).select("-password");

    if(!foundUser.isActive){
      return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
    }

    if(!foundUser.isAdmin){
        return NextResponse.json({error: "You must be the admin to be able to fetch all users"}, {status: 400})
    }
    // Case-insensitive search with $regex
    const searchQuery = {
      $or: [
        { fullName: { $regex: searchText, $options: 'i' } }, // Case-insensitive search on fullName
        { email: { $regex: searchText, $options: 'i' } }, // Case-insensitive search on email
      ],
    };

    // Pagination with skip and limit
    const skip = (pageIndex - 1) * pageLimit;

    const users = await User.find(searchQuery).skip(skip).limit(pageLimit);
    const totalUsers = await User.countDocuments(searchQuery);

    const response = NextResponse.json({
        message: "Users found successfully",
        users,
        pageCount,
    })

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.message}, {status: 400});
  }
}