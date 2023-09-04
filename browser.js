function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function search() {

        var location = document.getElementById("url").value;

        window.location.replace("https://traoxfish.us-3.evennode.com/geturl?url=" + location);

}