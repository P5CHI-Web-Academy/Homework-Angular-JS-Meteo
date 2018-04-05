function nextDayStart() {
    let day = new Date();
    day.setHours(0, 0, 0, 0);
    let nextDayStart = new Date(day);
    nextDayStart.setDate(day.getDate() + 1);
    return nextDayStart;
}
function nextDayEnd() {
    let nextDayEnd = new Date(nextDayStart());
    nextDayEnd.setHours(23, 59, 59, 999);
    return nextDayEnd;
}
function nextDateStr() {
    return nextDayStart().toDateString();
}

exports.nextDateStr = nextDateStr;
exports.nextDayStart = nextDayStart;
exports.nextDayEnd = nextDayEnd;
