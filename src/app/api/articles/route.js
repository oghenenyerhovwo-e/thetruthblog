import { NextResponse } from "next/server";
import {
    Article,
    User,
  } from "@/models";
  
  import {
    getDataFromToken,
    makeSlug,
  } from "@/helpers"
  
  import {
    databaseConnection,
  } from '@/config';

databaseConnection()

export const GET = async (request) => {
  const url  = new URL(request.url) 
  const pageIndex = url.searchParams.get("pageIndex")
  const pageLimit = url.searchParams.get("pageLimit")
  
  try {
      const foundArticles = await Article
        .find({})
        .sort({
            _id: -1,
        })
        .skip(pageIndex - 1)
        .limit(pageLimit)
        .populate("author")

        const totalArticles = await Article.countDocuments({})
        const pageCount = Math.ceil(totalArticles / pageLimit);

        const response = NextResponse.json({
            message: "Articles found successfully",
            articles: foundArticles,
            pageCount: pageCount,
        })

      return response;
  } catch (error) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}

export const POST = async (request) => {
    const data = await request.json();

    try {
        const userId = await getDataFromToken(request);
        const foundUser = await User.findOne({_id: userId}).select("-password");

        if(!foundUser){
          return NextResponse.json({error: "No user found"}, {status: 400})
        }

        if(!foundUser.isActive){
          return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
        }

        if(!data.category || data.category.length < 1){
          return NextResponse.json({error: "article must have at least one category"}, {status: 400})
        }

        const newArticle = new Article({
            ...data,
            slug: makeSlug(data.title),
            author: userId,
        })

        const savedArticle = await newArticle.save()
        const response = NextResponse.json({
            message: "Article created successfully",
            articleSlug: savedArticle.slug,
        })

      return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
