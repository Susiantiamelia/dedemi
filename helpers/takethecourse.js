function takeTheCourse (data) {
        let newArray = data.map(element => {
            return element.category
        });
        return newArray
}

function countTheCourse (data) {
    let courseList = takeTheCourse(data)
    let history = 0
    let mathematics = 0
    let geography = 0
    let biology = 0
    courseList.forEach(element => {
        if(element === "History") {
            history++
        }
        if(element === "Mathematics") {
            mathematics++
        }
        if(element === "Geography") {
            geography++
        }
        if(element === "Biology") {
            biology++
        }
    });

    return [history, mathematics, geography, biology]

}

module.exports = countTheCourse