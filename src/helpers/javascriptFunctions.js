import moment from "moment"

import { remark } from "remark"
import html from "remark-html"

export const getTimeAgo = (time) => {
    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'a few seconds',
            ss : '%d seconds',
            m:  "a minute",
            mm: "%d minutes",
            h:  "1 hour ago", //this is the setting that you need to change
            hh: "%d hours",
            d:  "a day",
            dd: "%d days",
            w:  "a week",
            ww: "%d weeks",
            M:  "1 month ago", //change this for month
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });
    return moment(time).fromNow();
}

export const toFirstLetterUpperCase  = (str) => {
    return str[0].toUpperCase() + str.slice(1)
}

export const markdownToHTML = async (markdown) => {
    const result = await remark().use(html).process(markdown)
    return result.toString()
}

export const makeSlug = (str) => {
    // Remove white spaces and replace with dash
    const slug = str.replace(/\s+/g, '-');

    // Remove special symbols using regex
    const cleanSlug = slug.replace(/[^\w\s-]/g, '');

    // Convert to lowercase
    const formattedSlug = cleanSlug.toLowerCase();

    return formattedSlug;
}
