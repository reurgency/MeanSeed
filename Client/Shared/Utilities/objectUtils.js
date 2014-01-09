var re = re || {};

re.shallowCopy = function (copyFromObject, copyToObject) {
    if (!copyToObject) {
        copyToObject = {};
    }

    for (var property in copyFromObject) {
        copyToObject[property] = copyFromObject[property];
    }

    return copyToObject;
}

re.logProperties = function (object) {
    try{
        for (var property in object) {
            console.log(property + " = " + object[property]);
        }
    } catch (error) {
        console.log("Error attempting to log properties:  " + error.message);
    }
}

console.log("objectUtils loaded");