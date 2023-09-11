
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

function sendFish() {
    var reciever = document.getElementById("sendfishto").value;
    var password = document.getElementById("sendfishpassword").value;

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "amount": formatedNumberToNumber(document.getElementById("sendfishamount").value),
        "reciever": reciever,
        "password": password
    };

    var validInfo = false;

    if (formatedNumberToNumber(document.getElementById("sendfishamount").value) != undefined && reciever != undefined && formatedNumberToNumber(document.getElementById("sendfishamount").value) > 0) {
        validInfo = true;
    } else {
        document.getElementById("sentstatus").textContent = "Couldn't send fish!";
        document.getElementById("sentstatus").style.color = "#ea7b7b";
        delay(2000).then(() => {
            document.getElementById("sentstatus").innerHTML = "<br>";
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
                document.getElementById("sendfishpassword").value = "";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").innerHTML = "<br>";
                });
            } else {
                document.getElementById("sentstatus").textContent = json.error;
                document.getElementById("sentstatus").style.color = "#ea7b7b";
                delay(2000).then(() => {
                    document.getElementById("sentstatus").innerHTML = "<br>";
                })
            }
            getFish()
        });
    }

}

function formatNumber(value) {
    if (value >= 1010000000000000000000000000000000)
        return (value / 1000000000000000000000000000000000).toFixed(2) + 'D'
    if (value >= 1000000000000000000000000000000000)
        return (value / 1000000000000000000000000000000000).toFixed(0) + 'D'
    if (value >= 1010000000000000000000000000000)
        return (value / 1000000000000000000000000000000).toFixed(2) + 'N'
    if (value >= 1000000000000000000000000000000)
        return (value / 1000000000000000000000000000000).toFixed(0) + 'N'
    if (value >= 1010000000000000000000000000)
        return (value / 1000000000000000000000000000).toFixed(2) + 'O'
    if (value >= 1000000000000000000000000000)
        return (value / 1000000000000000000000000000).toFixed(0) + 'O'
    if (value >= 1010000000000000000000000)
        return (value / 1000000000000000000000000).toFixed(2) + 'SS'
    if (value >= 1000000000000000000000000)
        return (value / 1000000000000000000000000).toFixed(0) + 'SS'
    if (value >= 1010000000000000000000)
        return (value / 1000000000000000000000).toFixed(2) + 'S'
    if (value >= 1000000000000000000000)
        return (value / 1000000000000000000000).toFixed(0) + 'S'
    if (value >= 1010000000000000000)
        return (value / 1000000000000000000).toFixed(2) + 'QQ'
    if (value >= 1000000000000000000)
        return (value / 1000000000000000000).toFixed(0) + 'QQ'
    if (value >= 1010000000000000)
        return (value / 1000000000000000).toFixed(2) + 'Q'
    if (value >= 1000000000000000)
        return (value / 1000000000000000).toFixed(0) + 'Q'
    if (value >= 1010000000000)
        return (value / 1000000000000).toFixed(2) + 'T'
    if (value >= 1000000000000)
        return (value / 1000000000000).toFixed(0) + 'T'
    if (value >= 1010000000)
        return (value / 1000000000).toFixed(2) + 'B'
    if (value >= 1000000000)
        return (value / 1000000000).toFixed(0) + 'B'
    if (value >= 1010000)
        return (value / 1000000).toFixed(2) + 'M'
    if (value >= 1000000)
        return (value / 1000000).toFixed(0) + 'M'
    if (value >= 1010)
        return (value / 1000).toFixed(2) + 'K'
    if (value >= 1000)
        return (value / 1000).toFixed(0) + 'K'
    return value
}

function formatedNumberToNumber(value) {
    if (value.toUpperCase().endsWith("D"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000000
    if (value.toUpperCase().endsWith("N"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000000
    if (value.toUpperCase().endsWith("O"))
        return Number(value.slice(0, -1)) * 1000000000000000000000000000
    if (value.toUpperCase().endsWith("SS"))
        return Number(value.slice(0, -2)) * 1000000000000000000000000
    if (value.toUpperCase().endsWith("S") && !value.endsWith("SS"))
        return Number(value.slice(0, -1)) * 1000000000000000000000
    if (value.toUpperCase().endsWith("QQ"))
        return Number(value.slice(0, -2)) * 1000000000000000000
    if (value.toUpperCase().endsWith("Q") && !value.endsWith("QQ"))
        return Number(value.slice(0, -1)) * 1000000000000000
    if (value.toUpperCase().endsWith("T"))
        return Number(value.slice(0, -1)) * 1000000000000
    if (value.toUpperCase().endsWith("B"))
        return Number(value.slice(0, -1)) * 1000000000
    if (value.toUpperCase().endsWith("M"))
        return Number(value.slice(0, -1)) * 1000000
    if (value.toUpperCase().endsWith("K"))
        return Number(value.slice(0, -1)) * 1000
    return Number(value)
}


document.getElementById('rarefishinfo').addEventListener('click',function (event){
    event.stopPropagation();
 });

function openShop() {
    document.getElementById("shop").style.display = "initial";
}

function closeShop() {
    document.getElementById("shop").style.display = "none";
}

document.getElementById("sendfishamount").oninput = function() {
    this.value = this.value.replace(/[^0-9.kKmMbBtTqQsSnOoNdD]/g, '').replace(/(\..*)\./g, '$1');
    if (isNaN(this.value.charAt(this.value.length-2)) && this.value.charAt(this.value.length-2) != '.' && this.value.charAt(this.value.length-2).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() != 's') this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'q' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() == 'q')) this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 's' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 's' && this.value.charAt(this.value.length-2).toLowerCase() == 's')) this.value = this.value.substr(0, this.value.length - 1)

    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.charAt(this.value.length-2) == '.') this.value = this.value.substr(0, this.value.length - 1)
    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.length == 1) this.value = ""
}

document.getElementById("betamount").oninput = function() {
    this.value = this.value.replace(/[^0-9.kKmMbBtTqQsSnOoNdD]/g, '').replace(/(\..*)\./g, '$1');
    if (isNaN(this.value.charAt(this.value.length-2)) && this.value.charAt(this.value.length-2) != '.' && this.value.charAt(this.value.length-2).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() != 's') this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 'q' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 'q' && this.value.charAt(this.value.length-2).toLowerCase() == 'q')) this.value = this.value.substr(0, this.value.length - 1)
    else if ((this.value.charAt(this.value.length-3).toLowerCase() == 's' && !isNaN(this.value.charAt(this.value.length-4))) || (this.value.charAt(this.value.length-1).toLowerCase() != 's' && this.value.charAt(this.value.length-2).toLowerCase() == 's')) this.value = this.value.substr(0, this.value.length - 1)

    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.charAt(this.value.length-2) == '.') this.value = this.value.substr(0, this.value.length - 1)
    if (isNaN(this.value.charAt(this.value.length-1)) && this.value.length == 1) this.value = ""
}

function buyItem(type) {
    var quantity = 1
    if (document.getElementById(type.toLowerCase() + "buyquantity") != undefined) quantity = Number(document.getElementById(type.toLowerCase() + "buyquantity").value)
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "purchaseType": type,
        "quantity": quantity
    };
    fetch('https://traoxfish.us-3.evennode.com/makepurchase', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.newCost != undefined) {
            document.getElementById(type.toLowerCase()  + "cost").textContent = formatNumber(json.newCost) + " fish"
            if (type == "specialFish") {
                document.getElementById(type.toLowerCase()  + "cost").textContent = "Buy Price: " + formatNumber(json.newCost) + " fish"
            } else if (type == "sellSpecialFish") {
                document.getElementById(type.toLowerCase()  + "cost").textContent = "Sell Price: " + formatNumber(json.newCost) + " fish"
            }
            getFish();
        }
        if (json.success != "success" && type == "specialFish" && json.error != undefined) {
            document.getElementById("specialfishstatus").innerText = "Error: " + json.error;
            delay(2000).then(() => {
                document.getElementById("specialfishstatus").innerHTML = "<br>";
            })
        }
    });
}

function sendMessage() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "message": document.getElementById("messageinput").value
    };
    fetch('https://traoxfish.us-3.evennode.com/sendchatmessage', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        getMessages()
        document.getElementById("messageinput").value = ""
        delay(200).then(() => {
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
        })
    });
}

function getMessages(first) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch('https://traoxfish.us-3.evennode.com/getchat', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        var same = false
        if (json.status == "success") {
            var chat = "";
            for (var message in json.messages.reverse()) {
                chat += json.messages[message] + "<br>"
            }
            if (chat == document.getElementById("chat").innerHTML) same = true
            document.getElementById("chat").innerHTML = chat
        }
        if (!same) {
            document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight)
        }
        if (first) {
            delay(250).then(() => { document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight) } ) 
        }
    });
}

function getItemCosts(type) {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
    };
    fetch('https://traoxfish.us-3.evennode.com/getcosts', {
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
            document.getElementById("rarefishcost").textContent = formatNumber(json.rareFishCost) + " fish"
            document.getElementById("veryrarefishcost").textContent = formatNumber(json.veryRareFishCost) + " fish"
            document.getElementById("sharkcost").textContent = formatNumber(json.sharkCost) + " fish"
            document.getElementById("raresharkcost").textContent = formatNumber(json.rareSharkCost) + " fish"
            document.getElementById("whalecost").textContent = formatNumber(json.whaleCost) + " fish"
            document.getElementById("specialfishcost").textContent = "Buy Price: " + formatNumber(json.specialFishCost) + " fish"
            document.getElementById("specialfishsellcost").textContent = "Sell Price: " + formatNumber(json.specialFishSellCost) + " fish"
        }
    });
}

function getLeaderboardType() {
    return document.getElementById("leaderboardtype").value;
}

function updateLeaderboards() {

    var type = getLeaderboardType()
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "leaderboardType": type
    };
    fetch("https://traoxfish.us-3.evennode.com/getleaderboards", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {

        if (json.status != "success" || json.leaderboards == undefined) return

        var i = 0;
        var leaderboard = document.getElementById("leaderboard");
        for (var fisher in json.leaderboards) {
            try {
                leaderboard.children.item(i).textContent = json.leaderboards[fisher].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[fisher].split(": ")[1]));
                var name = json.leaderboards[fisher].split(": ")[0]
                leaderboard.children.item(i).id = name
                if (json.onlineStatus[fisher]) {
                    leaderboard.children.item(i).style.color = "#84ea84";
                } else {
                    leaderboard.children.item(i).style.color = "#eeeeee";
                }
            } catch (e) {}
            i++
        }
        if (json.leaderboards.length > leaderboard.children.length) {
            for (var i = leaderboard.children.length; i < json.leaderboards.length; i++) {

                var item = document.createElement("li");
                var name = json.leaderboards[i].split(": ")[0]
                item.id = name
                item.addEventListener('click', function() { viewProfile(this.id) })
                item.style.cursor = "pointer"
                try {
                    item.textContent = json.leaderboards[i].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[i].split(": ")[1]));
                    
                    if (json.onlineStatus[i]) {
                        item.style.color = "#84ea84";
                    } else {
                        item.style.color = "#eeeeee";
                    }
                } catch (e) { console.log(e)}
                leaderboard.appendChild(item);
                
            }
        }
    });
}

var spinning = false
function spin() {

    if (spinning) return
    spinning = true

    const data1 = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "bet": formatedNumberToNumber(document.getElementById("betamount").value),
        "check": true
    };
    fetch("https://traoxfish.us-3.evennode.com/gamble", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.canAfford != true || json.status != "success") {
            spinning = false
            document.getElementById("spininfo").innerText = "Cannot afford to bet!"
            document.getElementById("spininfo").style.color = "#ea7b7b";
            delay(2000).then(() => {
                document.getElementById("spininfo").innerHTML = "<br>"
            })
        } else {

            document.getElementById("betamount").disabled = true

            var i = 0
            var i2 = 0
            var i3 = 0
        
            var int1
            var int2
            var int3
        
            int1 = setInterval(function(){
                i += 0.5
                document.getElementById("slot1").style.top = "calc(" + -(i % 11.25) + "vw - 8px)"
            }, 10)
            delay(200).then(() => {
                int2 = setInterval(function(){
                    i2 += 0.5
                    document.getElementById("slot2").style.top = "calc(" + -(i2 % 11.25) + "vw - 8px)"
                }, 10)
            })
            delay(400).then(() => {
                int3 = setInterval(function(){
                    i3 += 0.5
                    document.getElementById("slot3").style.top = "calc(" + -(i3 % 11.25) + "vw - 8px)"
                }, 10)
            })
        
            delay(2005).then(() => {
        
                const data = {
                    "username": getCookie("username"),
                    "loginKey": getCookie("loginKey"),
                    "bet": formatedNumberToNumber(document.getElementById("betamount").value)
                };
                fetch("https://traoxfish.us-3.evennode.com/gamble", {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(response => {
                    return response.json();
                }).then(json => {
                    document.getElementById("betamount").disabled = false
                    if (json.status != "success") {
                        clearInterval(int1)
                        clearInterval(int2)
                        clearInterval(int3)

                        delay(25).then(() => {
                            document.getElementById("slot1").style.top = "calc(-2.25vw - 8px)";
                            document.getElementById("slot2").style.top = "calc(-2.25vw - 8px)";
                            document.getElementById("slot3").style.top = "calc(-2.25vw - 8px)";
                            spinning = false

                            document.getElementById("spininfo").innerText = "Gamble failed!"
                            document.getElementById("spininfo").style.color = "#ea7b7b";

                            delay(2000).then(() => {
                                document.getElementById("spininfo").innerHTML = "<br>"
                            })
                        })
                        return
                    }
        
                    var slot1value = json.slot1
                    var slot2value = json.slot2
                    var slot3value = json.slot3
        
                    var valueToPx = {
                        2: "calc(-2.25vw - 8px)",
                        5: "calc(-4.5vw - 8px)",
                        25: "calc(-11.05vw - 8px)",
                        100: "calc(-6.7vw - 8px)",
                        1000: "calc(-8.9vw - 8px)"
                    }
        
                    clearInterval(int1)
                    clearInterval(int2)
                    clearInterval(int3)

                    delay(25).then(() => {
                        document.getElementById("slot1").style.top = valueToPx[slot1value];
                        document.getElementById("slot2").style.top = valueToPx[slot2value];
                        document.getElementById("slot3").style.top = valueToPx[slot3value];
                        spinning = false
            
                        if (Number(json.winnings) > 0 ) {
                            document.getElementById("spininfo").innerText = "You won " + formatNumber(Number(json.winnings)) + " fish!"
                            document.getElementById("spininfo").style.color = "#84ea84";
                        } else {
                            document.getElementById("spininfo").innerText = "You lost!"
                            document.getElementById("spininfo").style.color = "#ea7b7b";
                        }
                        delay(2000).then(() => {
                            document.getElementById("spininfo").innerHTML = "<br>"
                        })
                    })

                    
        
                });
            })

        }
    });
}

function getLeaderboards() {
    
    var type = getLeaderboardType()
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "leaderboardType": type
    };
    fetch("https://traoxfish.us-3.evennode.com/getleaderboards", {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {
        for (var fisher in json.leaderboards) {
            var leaderboard = document.getElementById("leaderboard");
            var item = document.createElement("li");
            try {
                item.textContent = json.leaderboards[fisher].split(": ")[0] + ": " + formatNumber(Number(json.leaderboards[fisher].split(": ")[1]));
                if (json.onlineStatus[fisher]) {
                    item.style.color = "#84ea84";
                } else {
                    item.style.color = "#eeeeee";
                }
            } catch (e) { console.log(e)}
            leaderboard.appendChild(item);
        }
    });
}

function logout() {
    document.cookie = "loginKey=";
    document.cookie = "username=";
    delay(5).then(() => {
        window.location.replace("https://www.traox.dev/fish");
    })
}

var firstMsg = false
function checkIfLoggedIn() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
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
        if (getCookie("loginKey") == "") {
            delay(1000).then(() => {
                if (!firstMsg) alert("You are not logged in! Visit https://www.traox.dev/fish to log in. You wont be able to see any data untill you are logged in.")
                firstMsg = true
                return  
            })
        }
        if (json.validKey == false) {
            window.location.replace("https://www.traox.dev/fish");
        }
    });

}

function keepOnline() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/online', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        return response.json();
    }).then(json => {

    });
}

delay(5).then(() => {
    checkIfLoggedIn();
    getFish();
    getItemCosts();
    getSendLogs()
    delay(66).then(() => {
        updateLeaderboards();
        getSpecialFishGraph()
        getMessages(true)
    })

    setInterval(function(){ 
        keepOnline();
        updateLeaderboards();
        getLevel();
        getMessages(false);
    }, 300);

    setInterval(function(){ 
        getFish();
        getSpecialFishGraph()
    }, 2000);

    setInterval(function(){ 
        getItemCosts()
        checkIfCaptchaed()
        getSendLogs()
        getFishPixels()
        checkIfLoggedIn()
    }, 1000);
});

setInterval(function(){ 
    if (document.getElementById("autofish").checked) {
        goFishing(true)
        document.getElementById("fishbutton").className = "innactivebutton"
    } else {document.getElementById("fishbutton").className = "fishbutton"}

}, 500);

function getFish() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getdata', {
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

            //fish
            document.getElementById("fishcount").textContent = formatNumber(json.fish)
            document.getElementById("rarefishcount").textContent = formatNumber(json.rareFish)
            document.getElementById("veryrarefishcount").textContent = formatNumber(json.veryRareFish)
            document.getElementById("sharkcount").textContent = formatNumber(json.sharks)
            document.getElementById("raresharkcount").textContent = formatNumber(json.rareSharks)
            document.getElementById("specialfishcount").textContent = formatNumber(json.specialFish)
            document.getElementById("whalecount").textContent = formatNumber(json.whales)

            //level
            document.getElementById("level").innerText = "Level: " + json.level
            document.getElementById("xpcolor").style.width = (json.currentLevelXp / (json.xpRequired + json.currentLevelXp)) * 100 + "%"
            document.getElementById("xpcount").innerText = "XP: " + json.currentLevelXp + " / " + (json.xpRequired + json.currentLevelXp)
            
            //costs
            document.getElementById("rarefishcost").textContent = formatNumber(json.costs.rareFishCost) + " fish"
            document.getElementById("veryrarefishcost").textContent = formatNumber(json.costs.veryRareFishCost) + " fish"
            document.getElementById("sharkcost").textContent = formatNumber(json.costs.sharkCost) + " fish"
            document.getElementById("raresharkcost").textContent = formatNumber(json.costs.rareSharkCost) + " fish"
            document.getElementById("whalecost").textContent = formatNumber(json.costs.whaleCost) + " fish"
            document.getElementById("specialfishcost").textContent = "Buy Price: " + formatNumber(json.costs.specialFishCost) + " fish"
            document.getElementById("specialfishsellcost").textContent = "Sell Price: " + formatNumber(json.costs.specialFishSellCost) + " fish"

            
        }
    });
}

const form  = document.getElementById('g-captcha');



form.addEventListener('submit', (event) => {
    const formData = new FormData(document.querySelector('form'))
    var cap = "";
    for (var pair of formData.entries()) {
        cap = (pair[1])
    }
    const data = {
        "g-recaptcha-response": cap
    };
    event.preventDefault();
    fetch('https://traoxfish.us-3.evennode.com/submitcaptcha', {
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
            document.getElementById('captcha').style.display = "none";
            grecaptcha.reset()
            delete formData.entries()[0][1];
        }
    });
});

document.getElementById("messageinput").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage()
    }
})


function checkIfCaptchaed() {
    fetch('https://traoxfish.us-3.evennode.com/checkcaptchaed', {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status == "success") {
            if (json.captchaed) {
                document.getElementById('captcha').style.display = "initial";
            }
        }
    });
}

function instantTooltips(textFrom, delta) {

    delta = parseFloat(delta) ? parseFloat(delta) : 5;

    function reposition(e) {

      var tooltip = this.nextSibling;

      tooltip.style.top = (e.pageY + delta - 30) + 'px';
      tooltip.style.left = (e.pageX + delta) + 'px';
    }

    var toTitle = document.querySelectorAll('[' + textFrom + ']'),

      span = document.createElement('span'),

      textProp = 'textContent' in document ? 'textContent' : 'innerText',

      parent, spanClone;

    span.classList.add('createdTooltip');

    [].forEach.call(toTitle, function(elem) {

      parent = elem.parentNode;

      spanClone = span.cloneNode();

      spanClone[textProp] = elem.getAttribute(textFrom);

      parent.insertBefore(spanClone, elem.nextSibling);

      elem.addEventListener('mousemove', reposition);

      elem.setAttribute(textFrom, '');
    });
  }



instantTooltips('title', 15);



function goFishing(force) {
    if (!force && document.getElementById("autofish").checked) return;

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
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
            document.getElementById("fishcount").textContent = formatNumber(json.fish)
        }
    });
}

var graphPoints
var hoverIndex = -1
function getSpecialFishGraph() {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getspecialfishgraph', {
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
            graphPoints = json.graph
        }
    });
}

function drawGraph() {
    var canvas = document.getElementById("specialfishgraph").getContext("2d");

    if (graphPoints == undefined) return

    var width = document.getElementById("specialfishgraph").width
    var height = document.getElementById("specialfishgraph").height

    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, width, height);

    canvas.strokeStyle = 'white';
    canvas.lineWidth = 2;

    canvas.beginPath();
    canvas.moveTo(20, 20);
    canvas.lineTo(20, 20);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(20, 20);
    canvas.lineTo(20, (height - 20));
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(20, (height - 20));
    canvas.lineTo((width - 20), (height - 20));
    canvas.stroke();

    var fishData = graphPoints

    canvas.strokeStyle = "#55ff55";
    canvas.lineWidth = 3;

    var highest = 0
    var lowest = 99999999999999

    for (var i in fishData) {
        if (fishData[i] > highest) highest = fishData[i]
        if (fishData[i] < lowest) lowest = fishData[i]
    }

    for (var i = 0; i < fishData.length; i++) {

        var point = ((fishData[i] - lowest) / (highest - lowest)) * 0.9

        canvas.beginPath();
        canvas.moveTo(((width - 40) * ((i) / fishData.length) + ((width - 40) / 2) / fishData.length) + 20, (height - 20) - (point * (height - 40)) - 2);
        canvas.lineTo(((width - 40) * ((i) / fishData.length) + ((width - 40) / fishData.length * 1.5)) + 20, (height - 20) - ((((fishData[i + 1] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2);
        canvas.stroke();

    }

    if (hoverIndex != -1) {

        canvas.strokeStyle = 'white';
        canvas.lineWidth = 1;

        canvas.beginPath();
        canvas.arc(((width - 40) * (hoverIndex / graphPoints.length)) + 20, (height - 20) - ((((graphPoints[hoverIndex] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2, 8, 0, 2 * Math.PI, false);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(((width - 40) * (hoverIndex / graphPoints.length)) + 20, (height - 20) - ((((graphPoints[hoverIndex] - lowest) / (highest - lowest)) * 0.9) * (height - 40)) - 2);
        canvas.lineTo(((width - 40) * (hoverIndex / graphPoints.length)) + 20, 40);
        canvas.stroke();

    }
}

setInterval(() => {
    drawGraph()
}, 40)
document.getElementById("specialfishhoverprice").style.display = "none"
function specialFishHover(event) {
    var rect = event.target.getBoundingClientRect();
    document.getElementById("specialfishhoverprice").style.display = "initial"
    var percent = Math.min(Math.max((event.clientX - rect.left) / document.getElementById("specialfishgraph").clientWidth * 96, 5.5), 91.5)
    document.getElementById("specialfishhoverprice").style.left = "calc(" + percent + "% - 16px)"
    hoverIndex = Math.floor((event.clientX - 10 - (rect.left)) / (document.getElementById("specialfishgraph").clientWidth - 20) * graphPoints.length)
    document.getElementById("specialfishhoverprice").innerHTML = formatNumber(graphPoints[hoverIndex] || "<br>")
    if (graphPoints[hoverIndex] == undefined) hoverIndex = -1
}

function stopSpecialFishHover() {
    hoverIndex = -1
    document.getElementById("specialfishhoverprice").style.display = "none"
}

function closeLogsBg() {
    document.getElementById("logsbg").style.display = "none";
}

function openSendLogs() {
    document.getElementById("logsbg").style.display = "initial";
}

function getSendLogs() {

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getsendlogs', {
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
            var sendlogs = document.getElementById("sendlogs")
            for (var i = sendlogs.children.length; i < json.logs.length; i++) {
                var log = json.logs[i]
                var logDiv = document.createElement('div')
                var logMsg = document.createElement('p')
                logMsg.innerHTML = log.origin.charAt(0).toUpperCase() + log.origin.slice(1) + ": " + log.user + "<br>Amount: " + formatNumber(Number(log.amount)) + " fish<br>Date: " + log.timestamp
                logMsg.className = "sendlogtext"
                logDiv.appendChild(logMsg)
                logDiv.className = "sendlog"
                sendlogs.appendChild(logDiv)
            }
        }
    });

}

var cursorx = -1
var cursory = -1

var fishPixeldata = [] 

for (var i = 0; i < 512; i ++) { 
    for (var j = 0; j < 512; j++) { 
        fishPixeldata[i * 512 + j] = "#ffffff"
    }
}

async function drawPixelFish() {
    var canvas = document.getElementById("pixelfishcanvas").getContext("2d");
    var width = document.getElementById("pixelfishcanvas").width
    var height = document.getElementById("pixelfishcanvas").height

    canvas.fillStyle = "white";
    canvas.fillRect(0, 0, width, height);

    canvas.strokeStyle = 'white';

    for (var i = 0; i < 512; i ++) { 
        delay(2).then(() => {
            for (var j = 0; j < 512; j++) { 

                canvas.fillStyle = fishPixeldata[i * 512 + j] || "#ffffff"
                canvas.fillRect(i * 10, j * 10, 10, 10);
    
                if (i * 512 + j == lastIndex) {
                    var x = i + 1
                    var y = j + 1
            
                    if (fishPixeldata[i * 512 + j] == undefined) return
            
                    var rgb = hexToRgb(fishPixeldata[i * 512 + j] || "#ffffff")
            
                    var lum = getLuminance(HEXToVBColor(fishPixeldata[i * 512 + j] || "#ffffff"))
            
                    canvas.lineWidth = 2;
    
                    canvas.strokeStyle = lum < 20 ? 'white' : 'black';
            
                    canvas.beginPath();
                    canvas.moveTo((x * 10) - 1, (y * 10) - 1);
                    canvas.lineTo(x * 10 - 1, (y - 1) * 10  + 1);
                    canvas.stroke();
            
                    canvas.beginPath();
                    canvas.moveTo(x * 10 - 1, (y - 1) * 10 + 1);
                    canvas.lineTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
                    canvas.stroke();
            
                    canvas.beginPath();
                    canvas.moveTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
                    canvas.lineTo((x - 1) * 10 + 1, y * 10 -1);
                    canvas.stroke();
            
                    canvas.beginPath();
                    canvas.moveTo((x - 1) * 10 + 1, y * 10 - 1);
                    canvas.lineTo(x * 10 - 1, y * 10 - 1);
                    canvas.stroke();
    
                }
            })   
        }
    }
}



var color = "";
setInterval(function() {
    document.getElementById("colorselectorcolor").style.backgroundColor = document.getElementById("colorinput").value
    document.getElementById("fullscreencolorselectorcolor").style.backgroundColor = document.getElementById("colorinputfullscreen").value
    if (fullscreen) color = document.getElementById("colorinputfullscreen").value
    else color = document.getElementById("colorinput").value
}, 10)

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}  

function HEXToVBColor(rrggbb) {
    var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
    return parseInt(bbggrr, 16);
}

function getLuminance(argb) {
    lum= (   77  * ((argb>>16)&255) 
               + 150 * ((argb>>8)&255) 
               + 29  * ((argb)&255))>>8;
    return lum;
}

var lastIndex = -1

function getPixelPlacePos(event) {
    var rect = event.target.getBoundingClientRect();


    
    var lastx = event.clientX
    var lasty = event.clientY

    var x = Math.round((event.clientX - 2 - (rect.left - 4)) / document.getElementById("pixelfishcanvas").clientWidth * 512)
    var y = Math.round((event.clientY - 2 - (rect.bottom - 4)) / document.getElementById("pixelfishcanvas").clientHeight * 512) + 512

    cursorx = x
    cursory = y

    var canvas = document.getElementById("pixelfishcanvas").getContext("2d");

    var index = ((cursorx - 1) * 512) + cursory - 1

    if (lastIndex != index) {
        canvas.fillStyle = fishPixeldata[lastIndex]
        var i1 = Math.floor(lastIndex / 512)
        var j1 = lastIndex % 512
        canvas.fillRect(i1 * 10, j1 * 10, 10, 10);
    }

    if (cursorx != -1 && cursory != -1) {

        var x = cursorx
        var y = cursory

        if (fishPixeldata[index] == undefined) return

        var rgb = hexToRgb(fishPixeldata[index])

        var lum = getLuminance(HEXToVBColor(fishPixeldata[index]))

        canvas.lineWidth = 2;

        canvas.strokeStyle = lum < 20 ? 'white' : 'black';

        canvas.beginPath();
        canvas.moveTo((x * 10) - 1, (y * 10) - 1);
        canvas.lineTo(x * 10 - 1, (y - 1) * 10  + 1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(x * 10 - 1, (y - 1) * 10 + 1);
        canvas.lineTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo((x - 1) * 10 + 1, (y - 1) * 10 + 1);
        canvas.lineTo((x - 1) * 10 + 1, y * 10 -1);
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo((x - 1) * 10 + 1, y * 10 - 1);
        canvas.lineTo(x * 10 - 1, y * 10 - 1);
        canvas.stroke();

    }

    lastIndex = index
}

function exitPixelCanvas() {
    down = false
    cursorx = -1
    cursory = -1
}

function getFishPixels() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getpixelart', {
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
            fishPixeldata = json.art
            await drawPixelFish()
        }
    });
}

var holdInterval
var down = false

function placePixel(event, down1) {

    down = down1

    if (down == false) {
        clearInterval(holdInterval)
        return
    } else {
        const data = {
            "username": getCookie("username"),
            "loginKey": getCookie("loginKey"),
            "index": lastIndex,
            "color": color
        };
        fetch('https://traoxfish.us-3.evennode.com/placepixel', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        }).then(json => {
        });
    }

    holdInterval = setInterval(function() {
        const data = {
            "username": getCookie("username"),
            "loginKey": getCookie("loginKey"),
            "index": lastIndex,
            "color": color
        };
        fetch('https://traoxfish.us-3.evennode.com/placepixel', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => {
            return response.json();
        }).then(json => {
            
        });
    }, 20)
}

await drawPixelFish()

var fullscreen = false
function fullscreenCanvas() {
    document.getElementById("colorinputfullscreen").value = document.getElementById("colorinput").value
    fullscreen = true
    document.getElementById("pixelfishcanvas").className = "pixelcanvasfullscreen"
    document.getElementById("pixelcanvasdiv").className = "pixelfishfullsecreen"
    document.getElementById("canvasfullscreenx").style.display = "inline-block"
    document.getElementById("colorinputfullscreen").style.display = "inline-block"
    document.getElementById("fullscreencolorselectorcolor").style.display = "inline-block"
}

function exitFullscreenCanvas() {
    document.getElementById("colorinput").value = document.getElementById("colorinputfullscreen").value
    fullscreen = false
    document.getElementById("pixelfishcanvas").className = "pixelfishcanvas"
    document.getElementById("pixelcanvasdiv").className = "pixelfish"
    document.getElementById("canvasfullscreenx").style.display = "none"
    document.getElementById("colorinputfullscreen").style.display = "none"
    document.getElementById("fullscreencolorselectorcolor").style.display = "none"
}

function getLevel() {
    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey")
    };
    fetch('https://traoxfish.us-3.evennode.com/getlevel', {
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
            document.getElementById("level").innerText = "Level: " + json.level
            document.getElementById("xpcolor").style.width = (json.currentLevelXp / (json.xpRequired + json.currentLevelXp)) * 100 + "%"
            document.getElementById("xpcount").innerText = "XP: " + json.currentLevelXp + " / " + (json.xpRequired + json.currentLevelXp)
        }
    });
}

function closeProfile() {
    document.getElementById("viewprofile").style.display = "none";

    document.getElementById("profile-username").innerText = "Loading..."
    document.getElementById("profile-fish").innerText = "Fish: Loading..."
    document.getElementById("profile-rarefish").innerText = "Rare Fish: Loading..."
    document.getElementById("profile-veryrarefish").innerText = "Very Rare Fish: Loading..."
    document.getElementById("profile-sharks").innerText = "Sharks: Loading..."
    document.getElementById("profile-raresharks").innerText = "Rare Sharks: Loading..."
    document.getElementById("profile-whales").innerText = "Whales: Loading..."
    document.getElementById("profile-specialfish").innerText = "Special Fish: Loading..."
    document.getElementById("profile-alltimefish").innerText = "All Time Fish: Loading..."
    document.getElementById("profile-fishgambled").innerText = "Fish Gambled: Loading..."
    document.getElementById("profile-joindate").innerText = "Join Date: Loading..."
    document.getElementById("profile-lastonline").innerText = "Last Online: Loading..."

}

function viewProfile(profile) {
    if (profile == undefined) {
        viewProfile(getCookie("username"))
        return
    }

    document.getElementById("viewprofile").style.display = "initial";

    const data = {
        "username": getCookie("username"),
        "loginKey": getCookie("loginKey"),
        "profile": profile
    };
    fetch('https://traoxfish.us-3.evennode.com/getprofile', {
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
            var displayName = json.displayName
            var level = json.level
            var fish = json.fish
            var rareFish = json.rareFish
            var veryRareFish = json.veryRareFish
            var sharks = json.sharks
            var rareSharks = json.rareSharks
            var whales = json.whales
            var specialFish = json.specialFish
            var allTimeFish = json.allTimeFish
            var fishGambled = json.fishGambled
            var joinDate = json.joinDate
            var lastOnlineDate = json.lastOnlineDate

            document.getElementById("profile-username").innerText = displayName + " (Lvl. " + level + ")"
            document.getElementById("profile-fish").innerText = "Fish: " + formatNumber(fish)
            document.getElementById("profile-rarefish").innerText = "Rare Fish: " + formatNumber(rareFish)
            document.getElementById("profile-veryrarefish").innerText = "Very Rare Fish: " + formatNumber(veryRareFish)
            document.getElementById("profile-sharks").innerText = "Sharks: " + formatNumber(sharks)
            document.getElementById("profile-raresharks").innerText = "Rare Sharks: " + formatNumber(rareSharks)
            document.getElementById("profile-whales").innerText = "Whales: " + formatNumber(whales)
            document.getElementById("profile-specialfish").innerText = "Special Fish: " + formatNumber(specialFish)
            document.getElementById("profile-alltimefish").innerText = "All Time Fish: " + formatNumber(allTimeFish)
            document.getElementById("profile-fishgambled").innerText = "Fish Gambled: " + formatNumber(fishGambled)
            document.getElementById("profile-joindate").innerText = "Join Date: " + joinDate
            document.getElementById("profile-lastonline").innerText = "Last Online: " + lastOnlineDate

        }
    });

    

}
