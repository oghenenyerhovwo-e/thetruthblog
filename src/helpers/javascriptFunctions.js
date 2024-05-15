import moment from "moment"
import sanitizeHtml from "sanitize-html"

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

export const makeSlug = (str) => {
    // Remove white spaces and replace with dash
    const slug = str.replace(/\s+/g, '-');

    // Remove special symbols using regex
    const cleanSlug = slug.replace(/[^\w\s-]/g, '');

    // Convert to lowercase
    const formattedSlug = cleanSlug.toLowerCase();

    return formattedSlug;
}

export const trimContent = (content, maxLength) => {
    // Check if the content length is already less than or equal to maxLength
    if (content.length <= maxLength) {
        return content;
    }

    // Find the next complete word after maxLength characters
    const nextWordIndex = content.indexOf(' ', maxLength);
    const trimmedContent = content.substring(0, nextWordIndex) + '...';

    return trimmedContent;
}

export const cleanHTML = (content) => {
    return sanitizeHtml(content, {
        allowedTags: [
            'p', 
            'strong', 
            'em', 
            'a', 
            "blockquote", 
            "h1", 
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
        ], // Add more allowed tags as needed
        allowedAttributes: { a: ['href'] }, // Allow href attribute for <a> tags
    });
}