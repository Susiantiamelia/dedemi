function convertArray(param1, param2){
    let newArray = param1.map(element => {
        return element[param2]
    });
    return newArray
}

module.exports = convertArray