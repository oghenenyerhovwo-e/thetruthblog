import { NextResponse } from "next/server";
import {
    Article,
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
      const foundArticle = await Article
        .findOne({slug: params.slug})
        .populate("author")
        .populate("comments")

        const response = NextResponse.json({
            message: "Article found successfully",
            article: foundArticle,
        })

      return response;
  } catch (error) {
      return NextResponse.json({error: error.message}, {status: 400});
  }
}

export const PUT = async (request, { params }) => {
    const data = await request.json();
    
    try {
        const userId = await getDataFromToken(request);

        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundArticle = await Article.findOne({slug: params.slug})

        if(!foundUser.isActive){
          return NextResponse.json({error: "user has been blocked, contact admin"}, {status: 400})
        }

        if(foundArticle.author !== foundUser._id){
            return NextResponse.json({error: "You must be the author of this article to be able to edit it"}, {status: 400})
        }
        
        const updatedArticle = Article.findByIdAndUpdate(foundArticle._id, data)

        const response = NextResponse.json({
            message: "Article updated successfully",
            articleId: updatedArticle._id,
        })

      return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}

export const DELETE = async (request, { params }) => {    
    try {
        const userId = await getDataFromToken(request);

        const foundUser = await User.findOne({_id: userId}).select("-password");
        const foundArticle = await Article.findOne({slug: params.slug})

        if(!foundUser.isActive){
          return NextResponse.json({error: "user has been blocked contact admin"}, {status: 400})
        }

        if(!foundUser.isAdmin && foundArticle.author !== foundUser._id){
            return NextResponse.json({error: "You must be the admin or the author of this article to be able to delete it"}, {status: 400})
        }
        
        const deletedArticle = Article.findByIdAndDelete(foundArticle._id)
        
        const response = NextResponse.json({
            message: "Article deleted successfully",
            articleId: deletedArticle._id,
        })

      return response
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}
