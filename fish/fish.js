function test() {
    const data = { username: 'example' };

    fetch('https://127.0.0.1:9999', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
}