document.getElementById('allow-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: new Date().toISOString()
                };
                
                // Send data to Cloudflare Worker
                fetch('https://tracksar.jovdat70.workers.dev/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(() => alert('Location sent!'))
                  .catch(err => console.error(err));
            },
            (err) => alert('Geolocation permission denied or error.')
        );
    } else {
        alert('Geolocation is not supported in your browser.');
    }
});
