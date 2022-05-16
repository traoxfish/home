function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function search() {
    if(event.keyCode == 13) {

        var location = document.getElementById("url").value;

        fetch('https://traoxfish.us-3.evennode.com/leaderboards', {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'No-Store'
            },
        }).then(response => {
            return response.json();
        }).then(json => {

        });

        fetch('https://traoxfish.us-3.evennode.com/traoxbrowse', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: location
            })
        }).then(response => {

            return response.text();
        }).then(text => {
            var parser = new DOMParser();
	        var doc = parser.parseFromString(JSON.parse(text).html, 'text/html');
            document.documentElement.innerHTML = "";
            var base = doc.createElement("base");
            base.href = location;
            doc.querySelector("head").appendChild(base);
            delay(1000).then(() => {
                document.documentElement.innerHTML = doc.documentElement.innerHTML;
            })
        });

    }
}