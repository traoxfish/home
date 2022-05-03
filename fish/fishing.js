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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

getFish()
getUncles()
getLeaderboards()

function sendFish() {
    var fish = document.getElementById("sendfishamount").value;
    var reciever = document.getElementById("sendfishto").value;

    const data = {
        "username": getCookie("username"),
        "loginkey": getCookie("loginkey"),
        "fish": fish,
        "reciever": reciever
    };

    var validInfo = false;

    if (fish != undefined && reciever != undefined && fish > 0) {
        validInfo = true;
    } else {
        document.getElementById("sentstatus").textContent = "Couldn't send fish!";
        document.getElementById("sentstatus").style.color = "#ea7b7b";
        delay(2000).then(() => {
            document.getElementById("sentstatus").textContent = "";
        });
    }

    if (validInfo) {
        fetch('https://traoxfish.us-3.evennode.com/sendfish', {
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
                document.getElementById("sentstatus").textContent = "Fish successfully sent!";
                document.getElementById("sentstatus").style.color = "#84ea84";
                document.getElementById("sendfishamount").value = "";
                document.getElementById("sendfishto").value = "";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").textContent = "";
                });
            } else {
                document.getElementById("sentstatus").textContent = json.error;
                document.getElementById("sentstatus").style.color = "#ea7b7b";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").textContent = "";
                })
            }
            getFish()
        });
    }

}

function buyUncle() {
    const data = {
        "username": getCookie("username"),
        "loginkey": getCookie("loginkey")
    };
    fetch('https://traoxfish.us-3.evennode.com/buyuncle', {
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
            document.getElementById("unclecount").textContent = "You have " + json.uncles + " uncles! Wow!"
        }
    });
}

function getUncles() {
    const data = {
        "username": getCookie("username"),
        "loginkey": getCookie("loginkey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getuncles', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.uncles != undefined && json.uncles > 0) {
            document.getElementById("unclecount").textContent = "You have " + json.uncles + " uncles! Wow!";
            document.getElementById("unclebutton").textContent = "Buy Uncle for " + json.nextuncle + " fish!";
        } else {
            document.getElementById("unclecount").textContent = "You have no uncles! :("
        }
    });
}

document.getElementById("sendfishamount").oninput = function() {
    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function getLeaderboards() {
    
    fetch('https://traoxfish.us-3.evennode.com/leaderboards', {
        method: 'GET',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        var child = leaderboard.lastElementChild; 
        while (child) {
            leaderboard.removeChild(child);
            child = leaderboard.lastElementChild;
        }
        return response.json();
    }).then(json => {
        for (var fisher in json) {
            var leaderboard = document.getElementById("leaderboard");
            var item = document.createElement("li");
            item.textContent = json[fisher];
            leaderboard.appendChild(item);
        }
    });
}

function logout() {
    document.cookie = "loginkey=";
    document.cookie = "username=";
}

function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginkey": getCookie("loginkey")
    };
    fetch('https://traoxfish.us-3.evennode.com/checkkey', {
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
    getLeaderboards()
    getFish()
    getUncles()
}, 2000);

function getFish() {
    const data = {
        "username": getCookie("username")
    };
    fetch('https://traoxfish.us-3.evennode.com/getfish', {
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
    fetch('https://traoxfish.us-3.evennode.com/fish', {
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