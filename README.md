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