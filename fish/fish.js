function test() {
    const data = { username: 'example' };

    fetch('https://traoxfish.us-3.evennode.com', {
    method: 'POST',
    headers: {
        'Orgin': 'http://localhost:5000',
        'Content-Type': 'application/json',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    },
    body: JSON.stringify(data),
    })
}