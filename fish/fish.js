function test() {
    const data = { username: 'example' };

    fetch('https://traoxfish.us-3.evennode.com', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
}