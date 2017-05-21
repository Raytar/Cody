'use strict';
import * as Discord from 'discord.js';
import * as fs from 'fs';
import {Cody} from './Cody';

interface Config {
    token: string;
}

const bot: Discord.Client = new Discord.Client();
const cody: Cody = new Cody();
const config: Config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

bot.on('ready', () => {
    console.log('Bot is ready!');
    bot.user.setGame('Learning to code');
});

bot.on('message', (msg) => {
    if (msg.isMentioned(bot.user.id)) {
        msg.channel.sendMessage(cody.runCode(cody.parseMessage(msg.content)));
    }
});

bot.login(config.token);