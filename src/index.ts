/*external libs*/
import { Telegraf, Telegram } from 'telegraf'
import dotenv from 'dotenv'
import shell from 'shelljs';
import address from 'address';
import publicIp from 'public-ip';
/*other*/

// load envs from .env file
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const states = {
    shell: false
}

bot.command('/ip', async ctx => {
    const localIp = address.ip();
    const externalIp = await (async () => {
        let ip;
        try {
            ip = await publicIp.v4()
        } catch(e) {
            await  ctx.reply(`error upon receipt of ip: `, e)
            ip = "failed to load"
        }

        return ip;
    })();

    await ctx.reply(`local ip: ${localIp} \nip: ${externalIp}`);
})

bot.command('/shell', async ctx => {
    states.shell = !states.shell;

    return ctx.reply(`shell ${states.shell ? 'ON' : 'OFF'}`)
})

bot.on('text',async ctx => {
    if(states.shell) {
        const text = ctx.message.text;

        if(text) {
            const result = await shell.exec(
                text,
                {
                    silent: true,
                    encoding: 'utf-8'
                }
            )

            result.stdout && await ctx.reply(`STDOUT: \n${result.stdout}`)
            result.stderr && await ctx.reply(`STDERR: \n${result.stderr}`)
        }
    }
})

;(async () => {
    await bot.launch();
    await bot.telegram.sendMessage(process.env.OWNER_TG_ID, 'bot started');
})();























