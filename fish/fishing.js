function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

getFish()

function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginkey": getCookie("loginkey")
    };
    fetch('http://traoxfish.us-3.evennode.com/checkkey', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status != "true") {
            window.location.replace("https://www.traox.dev/fish");
        }
    });

}

checkIfLoggedIn()

setInterval(function(){ 
    checkIfLoggedIn()
  }, 5000);

function getFish() {
    const data = {
        "username": getCookie("username")
    };
    fetch('http://traoxfish.us-3.evennode.com/getfish', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.fish != undefined) {
            document.getElementById("fishcount").textContent = "You have " + json.fish + " fish! Wow!"
        } else {
            document.getElementById("fishcount").textContent = "You have no fish! :("
        }
    });
}

function goFishing() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginkey")
    };
    fetch('http://traoxfish.us-3.evennode.com/fish', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            console.log("fished! " + json.fish)
            document.getElementById("fishcount").textContent = "You have " + json.fish + " fish! Wow!"
        } else {
            console.log("can't fish yet.")
        }
    });
}