const mineflayer = require('mineflayer');

const [,, ipPort, userId] = process.argv;
const [host, port] = ipPort.split(':');

const bot = mineflayer.createBot({
    host,
    port: parseInt(port),
    username: `bot_${userId}`,
    version: false,
});

bot.once('spawn', () => {
    bot.chat('أنا راقصة اح اح');
    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 300);
    }, 2000);
});
