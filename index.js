const { os }  = require('./config');
const { computerIsOn } = require('./actions')(os);

const state = require('./state/state');

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
    state.set('exit', process.exitCode);
    ctx.reply('Введите что-то для завершения роботы.');
});

bot.use((ctx) => {
    if(state.has('exit')){
        ctx.reply('Bot closing...');

        const exitCode = state.get('exit');
        process.exit(exitCode);
    }
})

bot.launch()
