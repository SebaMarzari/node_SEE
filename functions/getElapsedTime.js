const serverStartUp = require('../data/serverStartUp');

const getElapsedTime = () => {
    const serverStartTime = new Date(serverStartUp.initDate + ' ' + serverStartUp.initHour);
    const now = new Date();
    const elapsedTime = now - serverStartTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

module.exports = getElapsedTime;