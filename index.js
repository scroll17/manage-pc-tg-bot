const { os }  = require('./config');

const { computerIsOn } = require('./actions')(os);

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);

const {
    commands: {
        EXIT
    }
} = require('./contstants');


computerIsOn();

bot.start((ctx) => {
    ctx.reply("hello");
})

bot.command(EXIT, (ctx) => {
    ctx.reply('Do you exit ?');
    process.exit(0);
});

bot.launch()
