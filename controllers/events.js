const eventList = require('../data/events');
const serverStartUp = require('../data/serverStartUp');
const errorList = require('../data/errorList');
const getElapsedTime = require('../functions/getElapsedTime');

const events = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  res.write('\n');

  const interval = setInterval(() => {
    const eventData = JSON.stringify(eventList);
    const serverData = JSON.stringify(serverStartUp);
    const errorData = JSON.stringify(errorList);
    const now = new Date();
    const currentDateTimestamp = now.toLocaleDateString();
    const currentHourTimestamp = now.toLocaleTimeString();
    const elapsedTime = getElapsedTime();
    serverStartUp.currentDate = currentDateTimestamp;
    serverStartUp.currentHour = currentHourTimestamp;
    serverStartUp.elapsedTime = elapsedTime;
    const eventMessage = `event: eventUpdate\ndata: ${eventData}\n\n`;
    const serverMessage = `event: serverUpdate\ndata: ${serverData}\n\n`;
    const errorMessage = `event: errorUpdate\ndata: ${errorData}\n\n`;

    res.write(eventMessage);
    res.write(serverMessage);
    res.write(errorMessage);
  }, 30000);

  req.on('close', () => {
    clearInterval(interval);
  });
}

const eventsTable = async (req, res) => {
  const now = new Date();
  const currentDateTimestamp = now.toLocaleDateString();
  const currentHourTimestamp = now.toLocaleTimeString();
  const elapsedTime = getElapsedTime();
  serverStartUp.currentDate = currentDateTimestamp;
  serverStartUp.currentHour = currentHourTimestamp;
  serverStartUp.elapsedTime = elapsedTime;
  res.render('events', {
    events: eventList,
    serverStartUp: serverStartUp,
    errors: errorList
  });
}

module.exports = {
  events,
  eventsTable
}