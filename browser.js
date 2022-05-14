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

        fetch('https://traoxfish.us-3.evennode.com/browse', {
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
            console.log(text)
        });

    }
}