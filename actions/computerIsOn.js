module.exports = async (id, info, telegram) => {
    const date = new Date();

    await telegram.sendMessage(id, `
         *${info.username}*, your computer started !\n\nDate = *${date}*\nComputer name = *${info.pc_name}*\nOS = *${info.type}*\n
        `, {
            parse_mode: "Markdown"
        }
    );
}
