const extractDate = (dateString) => {
    const parsed = dateString.split("T");
    const dateParsed = parsed[0].split("-").reverse();
    return dateParsed.join("-");
}

module.exports = {
    extractDate,
}