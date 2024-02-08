// hey.jsのmodule.exportsを呼び出します。
const heyFile = require('./commands/hey.js');
const hogetaFile = require('./commands/hogeta.js');
const jankenFile = require('./commands/janken.js');

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require('discord.js');
// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { token } = require('./config_.json');
// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMembers] });


// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, c => {
	console.log(`準備OKです! ${c.user.tag}がログインします。`);
});

//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async interaction => {

    // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
    // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
    if (!interaction.isChatInputCommand()) return;

    // heyに対する処理
    if (interaction.commandName === heyFile.data.name) {
        try {
            await heyFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }

    //hogetaに対する処理
    if (interaction.commandName === hogetaFile.data.name) {
        try {
            await hogetaFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }

    //じゃんけんの処理
    if (interaction.commandName === jankenFile.data.name) {
        try {
            await jankenFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

//Discordという文字列が入っているとメッセージを投稿する。
client.on(Events.MessageCreate,message=>{
    if(message.author.bot)return;
    if(message.guild.id!=="857273080091246592")return;
    if(message.content.includes("Discord")){
        message.channel.send("こんにちは！Discord Botです。");
    }
})


// ログインします
client.login(token);