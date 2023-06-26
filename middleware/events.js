const events = require('../data/events')

const getURL = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  let found = false;

  if (events && events.length > 0) {
    events.forEach((item) => {
      console.log("URL", item)
      if (item.url === url) {
        item.quantity += 1;
        found = true;
      }
    });

    if (!found) {
      events.push({
        url: url,
        quantity: 1
      });
    }
  } else {
    events.push({
      url: url,
      quantity: 1
    });
  }

  next();
}

module.exports = getURL;
