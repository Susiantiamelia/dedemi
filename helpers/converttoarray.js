function convertArray(courseId){
    let newArray = courseId.map(element => {
        return element.CourseId
    });
    return newArray
}

module.exports = convertArray