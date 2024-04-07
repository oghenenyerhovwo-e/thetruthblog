This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



Prepare a json array of 15 objects. Each object should have a 
_id
title: A string
author: A string
datePublished: Date and time
ctegory: category should be an array of one or more of the following: Home, Politics, Sport, Entertainment, Business, News, Technology, International, Features, Blogs Feed
content: It should be an html div with real contents, including paragraphs, blockquotes, bold places, different sections
image: a url string
source:  The source from which the news article originated.
Tags: An array of keywords for search purposes
comments: an array of various objects which are the comments of users. Each comment object should contain an _id, username, email, text, date_published
seoMetaData
numberOfSocialMediaShares


title, 
headline,
author,
datePublished,
category,
content,
image,
source,
tags,
comments,

I am building a blog with nextjs and mongoose. My user schema is this
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    profilePic: {
        type: String,
        required: [true, "Please provide a profile picture"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

I created a /users/search route in the api folder. and this route receives the following as query

const {searchText, pageIndex, pageLimit} = await request.query();

I want this route to search through the users with the searchText which is a value gotten from the frontend. I want users that either the fullName or email, is related but not necessarily equal to the search text


I am building a blog with nextjs and mongoose and this is my article schema

import mongoose from "mongoose";
import next from "next";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        maxLength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
    },
    headline: {
        type: String,
        required: [true, "Please provide a headline"],
        minLength: [100, "Headline cannot be less than 100 characters"],
        maxLength: [300, "Headline cannot exceed 300 characters"],
    },
    category: {
        type: Array,
        required: [true, "Article must have category(s)"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "An Article must have an author"],
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    content: {
        type: String,
        required: [true, "Article must have content"],
    },
    image: {
        type: String,
        required: [true, "Article must have an image"],
    },
    source: {
        type: String,
    },
    tags: {
        type: String,
        required: [true, "Article must have tags"],
    },
})

const Article = mongoose.models.articles || mongoose.model("articles", articleSchema);

articleSchema.pre("validate", async () => {
    const article = this
    if(!article.isModified("title")) return next()
    const existingArticle = await Article.findOne({title: article.title})
    if(existingArticle){
        const err = new Error("Title must be unique.")
        err.errors = {title: {message: "This Title may have been used before."}}
        next(err)
    }
    next()
})

export default Article;

I created app in the front end where I make a call to the backend to get articles by the slug data. in that same page I need to get articles about six of them maximum thatarerelated to that particular article. How do I implmement this