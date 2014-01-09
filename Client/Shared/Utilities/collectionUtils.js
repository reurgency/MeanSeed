var re = re || {};

re.getIndexByProperty = function (collection, propertyName, value) {
    for (var index = 0; index < collection.length; index++) {
        var object = collection[index];
        if (object[propertyName] == value) {
            return index;
        }
    }

    return -1;
}

re.getItemByProperty = function (collection, propertyName, value) {
    var index = re.getIndexByProperty(collection, propertyName, value);
    if( index == -1 ){
        return null;
    }
    return collection[index];
}