export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const clientKey = request.headers.get('x-client-key');
    if (clientKey !== env.CLIENT_KEY) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.json();

    await fetch(env.DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `New location received:\nLatitude: ${data.latitude}\nLongitude: ${data.longitude}\nTime: ${data.timestamp}`
      })
    });

    return new Response('OK', { status: 200 });
  }
};
