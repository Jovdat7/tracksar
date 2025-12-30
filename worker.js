export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const data = await request.json();

      // Get webhook URL from environment variable
      const webhook = env.DISCORD_WEBHOOK;

      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `New location received:\nLatitude: ${data.latitude}\nLongitude: ${data.longitude}\nTime: ${data.timestamp}`
        })
      });

      return new Response('Sent to Discord!', { status: 200 });
    }

    return new Response('Send a POST request with JSON data.', { status: 400 });
  }
};
