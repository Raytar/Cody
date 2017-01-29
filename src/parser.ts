"use strict";

import * as Discord from 'discord.js';

export class MessageParser {
    msg: Discord.Message;
    command: string;
    lang: string;
    code: string;

    constructor(msg: Discord.Message) {
        this.msg = msg;
        this.parse();
    }

    parse(): void {
        let content: string = this.msg.content;
        //remove the bot's mention
        content = content.replace(/@.+#[0-9]{4}/, '');
        //get the first word in the message, which will be the command
        this.command = content.split(' ')[0];

        let search = content.match(/`{3}(.+)\b([\s\S]*)`{3}/);
        //get the language
        this.lang = search[0];
        //get the code
        this.code = search[1];
    }
}