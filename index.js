const { Telegraf, Markup } = require('telegraf');
const { exec } = require('child_process');
const axios = require('axios');
const bot = new Telegraf('7648670732:AAHcQpPAq2CogKtWQQ8H65xd5ZZpW7PZ1eM');

const CHANNEL_1 = 'jhjgkghhhgc';
const CHANNEL_2 = 'jgjghghvc';

function checkSubscription(ctx) {
    return Promise.all([
        ctx.telegram.getChatMember('@' + CHANNEL_1, ctx.from.id),
        ctx.telegram.getChatMember('@' + CHANNEL_2, ctx.from.id)
    ]).then(results => {
        return results.every(res => ['member', 'creator', 'administrator'].includes(res.status));
    }).catch(() => false);
}

bot.start(async (ctx) => {
    const subscribed = await checkSubscription(ctx);
    if (!subscribed) {
        return ctx.reply('اشترك بالقنوات أولاً', Markup.inlineKeyboard([
            [Markup.button.url('قناة 1', 'https://t.me/' + CHANNEL_1)],
            [Markup.button.url('قناة 2', 'https://t.me/' + CHANNEL_2)]
        ]));
    }

    ctx.reply('اهلا بك في بوت ماينكرافت', Markup.keyboard([
        ['تشغيل البوت'], ['ايقاف البوت'], ['الرقص اح اح']
    ]).resize());
});

bot.hears('تشغيل البوت', async (ctx) => {
    ctx.reply('ارسل ip:port للسيرفر');
    bot.on('text', async (ctx) => {
        const input = ctx.message.text;
        ctx.reply('جاري الدخول للسيرفر...');
        exec(`node join.js ${input} ${ctx.from.id}`);
    });
});

bot.hears('ايقاف البوت', (ctx) => {
    exec(`pkill -f "node join.js"`);
    ctx.reply('تم إيقاف البوت.');
});

bot.hears('الرقص اح اح', (ctx) => {
    ctx.reply('أنا راقصة اح اح');
});

bot.launch();
