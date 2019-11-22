const users = require('../config/users');

const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.BOT_TOKEN);

const _computerIsOn = require('./computerIsOn');

module.exports = (os) => {
    const { ip_ethernet, type, pc_name } = os;
    const user = users.get(ip_ethernet);

    return {
        computerIsOn: () => _computerIsOn(user.id, {
            type,
            pc_name,
            username: user.name
        }, telegram),
        
    }
}
