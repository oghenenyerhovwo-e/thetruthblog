import moment from "moment"

const getTimeAgo = (time) => {
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

export {
    getTimeAgo
}