window.onload = function() {
    window.onresize = function() {
        var mq = window.matchMedia( "(max-width: 700px)" );
        var spans = document.getElementsByTagName("span");
        if (mq.matches) {
            var br = document.createElement("br");
            for (var i = 0; i < spans.length; i++) {
                spans.item(i).parentElement.insertBefore(br, spans.item(i));
            }
        } else {
            for (var i = 0; i < spans.length; i++) {
                spans.item(i).setAttribute("style", "display: default;");
            }
        }
    }
}