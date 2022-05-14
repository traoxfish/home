function search() {
    if(event.keyCode == 13) {
        var location = document.getElementById("url").value;
        
        fetch(location, {
            method: 'GET',
            credentials: "same-origin",
        }).then(response => {
    
            return response.text();
        }).then(text => {
            console.log(text)
        });


    }
}