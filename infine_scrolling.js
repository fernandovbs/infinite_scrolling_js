document.addEventListener("DOMContentLoaded", function(event) { 
    var wrapper = document.getElementById('wrapper');
    if (wrapper.addEventListener)
        wrapper.addEventListener("scroll", scrollHandler, false)
    else if (wrapper.attachEvent)
        wrapper.attachEvent('onScroll', scrollHandler)
});

function scrollHandler(e){
    console.log(e)
}