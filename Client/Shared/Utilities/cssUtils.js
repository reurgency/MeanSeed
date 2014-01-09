var re = re || {};

//(JNewton) Function pulled from StackOverflow: http://stackoverflow.com/questions/10958869/jquery-get-css-properties-values-for-a-not-yet-applied-class
re.getCSSPropertyFromClass = function (prop, fromClass) {

    var $inspector = $("<div>").css('display', 'none').addClass(fromClass);
    $("body").append($inspector); // add to DOM, in order to read the CSS property
    try {
        return $inspector.css(prop);
    } finally {
        $inspector.remove(); // and remove from DOM
    }
};