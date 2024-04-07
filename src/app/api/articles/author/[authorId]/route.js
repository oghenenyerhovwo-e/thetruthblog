import { NextResponse } from "next/server";
import {
    Article,
  } from "@/models";
  
  import {
    databaseConnection,
  } from '@/config';

databaseConnection()

export const GET = async (request, { params }) => {  
    const url  = new URL(request.url) 
    const pageIndex = url.searchParams.get("pageIndex")
    const pageLimit = url.searchParams.get("pageLimit")
    try {
        const foundArticles = await Article
            .find({author: params.authorId})
            .sort({
                _id: -1,
            })
            .skip(pageIndex - 1)
            .limit(pageLimit)
            .populate("author")

            const totalArticles = await Article.countDocuments({author: params.authorId})
            const pageCount = Math.ceil(totalArticles / pageLimit);

            const response = NextResponse.json({
                message: "Article found successfully",
                articles: foundArticles,
                pageCount: pageCount,
            })

        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}