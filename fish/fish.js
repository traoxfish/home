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
        if (json.status == "true") {
            window.location.replace("https://www.traox.dev/fish/fish");
        }
    });

}

checkIfLoggedIn()

function createAccount() {

    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    console.log(password)
    console.log(username)

    const data = {
        "username": username,
        "password": password
    };
    fetch('https://traoxfish.us-3.evennode.com/newfisher', {
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
            document.getElementById("username").textContent = "Account successfully created!"
            document.getElementById("password").style.color = "#84ea84";
            document.getElementById("sendfishamount").value = "";
            document.getElementById("sendfishto").value = "";
            delay(2000).then(() => {
                document.getElementById("accountstatus").textContent = "";
            });
            login();
        } else {
            document.getElementById("accountstatus").textContent = json.error;
            document.getElementById("accountstatus").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("accountstatus").textContent = "";
            });
        }
    });
}

function login() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    console.log(password)
    console.log(username)

    const data = {
        "username": username,
        "password": password
    };
    fetch('https://traoxfish.us-3.evennode.com/login', {
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
            document.getElementById("accountstatus").textContent = "Logged in!"
            document.cookie = "loginkey=" + json.key;
            document.cookie = "username=" + username;
            window.location.replace("https://www.traox.dev/fish/fish");
        } else {
            document.getElementById("accountstatus").textContent = json.error;
        }
    });
}