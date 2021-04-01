const { os }  = require('./config');
const { computerIsOn } = require('./actions')(os);
const address = require('address');
const internalIp = require('internal-ip');

const fs = require('fs');
const path = require('path');

const fileName = path.dirname(__dirname, '../ip.txt');
fs.writeFileSync(fileName, `local ip: ${address.ip()}`, { encoding: 'utf8' })

const state = require('./state/state');

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);

const {
    commands: {
        EXIT
    }
} = require('./contstants');


bot.start(async (ctx) => {
    let ip;
    try {
        ip = await internalIp.v4()
    } catch {}

    ctx.reply(`
        local ip: ${address.ip()}
        ip: ${ip}
    `);
})

bot.command(EXIT, (ctx) => {
    state.set('exit', process.exitCode);
    ctx.reply('Введите что-то для завершения роботы.');
});



// bot.use((ctx) => {
//     if(state.has('exit')){
//         ctx.reply('Bot closing...');
//
//         const exitCode = state.get('exit');
//         process.exit(exitCode);
//     }
// })

bot.launch()
