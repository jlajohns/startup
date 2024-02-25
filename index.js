const WebSocket = require('ws');
const { google } = require('googleapis');

// Set up Google Calendar API credentials
const credentials = require('./credentials.json');
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', async function incoming(message) {
    console.log('Received message:', message);

    try {
      const event = JSON.parse(message);
      const response = await addEventToCalendar(event);
      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error:', error);
      ws.send(JSON.stringify({ error: 'Failed to add event to calendar' }));
    }
  });
});

async function addEventToCalendar(event) {
  try {
    // Authorize a client with credentials
    const token = 'YOUR_ACCESS_TOKEN';
    oAuth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    console.log('Event created:', res.data);
    return { success: true, event: res.data };
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
}

// now connect to the API 
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
  console.log('WebSocket connected');
});

socket.addEventListener('message', function (event) {
  console.log('Response from server:', event.data);
});

socket.addEventListener('error', function (event) {
  console.error('WebSocket error:', event);
});

socket.addEventListener('close', function (event) {
  console.log('WebSocket connection closed');
});

// this was marked as deprecated find out why?
// socket.send(JSON.stringify(event));