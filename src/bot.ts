"use strict";

import * as Discord from 'discord.js';
import * as fs from 'fs';
import {MessageParser} from './parser';
import {CodeRunner} from './coderunner';

interface Config {
    token: string;
}

const bot: Discord.Client = new Discord.Client();
const config: Config = JSON.parse(fs.readFileSync('../config.json', 'utf8'));

bot.on('ready', () => {
    console.log('Bot is ready!');
});

bot.on('message', (msg) => {
    //check if the bot is mentioned
    if (msg.isMentioned(bot.user.id)) {
        let parser = new MessageParser(msg);
        switch (parser.command) {
            case 'run':
                var codeRunner = new CodeRunner(parser.lang, parser.code);
                msg.channel.sendMessage(codeRunner.run());
                break;
        
            default:
                break;
        }
    }
});

bot.login(config.token);