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
  const searchText = url.searchParams.get("searchText")
  const pageIndex = url.searchParams.get("pageIndex")
  const pageLimit = url.searchParams.get("pageLimit")

  try {
    if(!searchText){
      return NextResponse.json({error: "no text"}, {status: 400})
    }
    // Create a text index for efficient searching
    const articleSchema = Article.schema; // Get the schema
    if (!articleSchema.indexes().find((index) => index.name === 'textIndex')) { // Check if index exists
      await articleSchema.index({ title: 'text', headline: 'text', category: 'text', content: 'text', tags: 'text' }, { name: 'textIndex' }); // Create text index
    }

    // Full-text search using $text and $regex for flexibility
    const searchQuery = {
      $text: { $search: searchText }, // Search across specified fields
      $or: [ // Additional filtering if needed (optional)
        { title: { $regex: searchText, $options: 'i' } }, // Case-insensitive title search (optional)
        { headline: { $regex: searchText, $options: 'i' } }, // Case-insensitive headline search (optional)
      ],
    };

    // Pagination with skip and limit
    const skip = (pageIndex - 1) * pageLimit;

    const articles = await Article.find(searchQuery, { score: { $meta: 'textScore' } }). // Include search score
      sort({ score: { $meta: 'textScore' } }).skip(skip).limit(pageLimit); // Sort by relevance and paginate

    const totalArticles = await Article.countDocuments(searchQuery); // Count total matching articles
    const pageCount = Math.ceil(totalArticles / pageLimit);

    const response = NextResponse.json({
        message: "Articles found successfully",
        articles,
        pageCount,
    })

return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.message}, {status: 400});
  }
}