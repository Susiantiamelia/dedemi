const humanizeDuration = require("humanize-duration")

function converttime (minute) {
    return humanizeDuration(minute * 60000, {language:"id"})
}
module.exports = converttime