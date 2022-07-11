const Discord = require('discord.js');
const values = require('./assets/tools.json');

/**
 * @param {Object} action - interaction or message event
 * @param {Array} embeds - array of embeds
 * @param {Object} options - index, row, id, send, filter, time
 * @description select menu paginator with built in builders, however you can specify an index embed, your own row, unique id, filter and time for collection.
 * @returns a select menu paginator.
*/
function selectMenuPaginator(action, embeds, options = {}) {
    if (!action) throw new Error('Expected an event to be parsed.')

    if (!Array.isArray(embeds)) throw new Error('Expected embeds to be an array.');

    if (!options.index) {
        options.index = new Discord.MessageEmbed()
            .setTitle(`${embeds.length} pages`)

        embeds.map((embed, i = 0) => {
            options.index.addField(embed.title || embed?.author?.name, embed.description || `Page ${i + 1}`)
        })
    }

    if (!options.row) {
        options.row = new Discord.MessageActionRow();

        if (!options.id) options.id = `${action.id}-menu`;

        options.comp = new Discord.MessageSelectMenu()
            .setCustomId(options.id)
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Select a page.')
            .addOptions({ label: 'Index', description: 'Index Page', value: 'index' })

        embeds.map((embed, i = 0) => {
            options.comp.addOptions({ label: embed.title || embed?.author?.name, description: embed?.description?.slice(0, 100) || `Page ${i + 1}`, value: values[embeds.indexOf(embed)] })
        })

        options.row.addComponents(options.comp);
    }

    if (!options.id) options.id = options.row.customId;

    (async () => {
        let embed = options.index;

        let m = options.send ? await action.channel.send({ embeds: [embed], components: [options.row] }) : await reply(action, { embeds: [embed], components: [options.row] })

        action.channel.createMessageComponentCollector({ filter: options.filter, time: options.time || 300000 })

            .on('collect', async (a) => {
                if (!a.isSelectMenu()) return;

                if (a.customId != options.id) return;

                let chosen = a.values[0];

                if (chosen === options.row.components[0]?.options[0]?.value) embed = options.index;

                else embed = embeds[values.indexOf(chosen)];

                a.update({ embeds: [embed] });
            })

            .on('end', async () => {
                if (action.editReply) action.editReply({ components: [] });

                if (action.edit) await m.edit({ components: [] });
            })
    })();
}

/**
 * 
 * @param {Object} action - interaction or message event
 * @param {Array} embeds - array of embeds
 * @param {Object} options - index, send, filter, time
 * @description button paginator with built in builders, however you can specify an index of start embed, filter and time for collection.
 * @returns a button paginator.
 */
function buttonPaginator(action, embeds, options = {}) {

    if (!options.buttons) options.buttons = ["⏪", "◀️", "⏹️", "▶️", "⏩"];

    if (options.buttons.length <= 4 || options.buttons.length > 5) throw new Error('Must specify 5 emotes.')

    options.row = new Discord.MessageActionRow()

    for (const button of options.buttons) {
        options.row
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId(`${action.id}-${values[options.buttons.indexOf(button)]}`)
                    .setStyle('PRIMARY')
                    .setEmoji(button)
            )
    }

    (async () => {
        let embed = embeds[options.index || 0]
        let m = options.send ? await action.channel.send({ embeds: [embed], components: [options.row] }) : await reply(action, { embeds: [embed], components: [options.row] })

        action.channel.createMessageComponentCollector({ filter: options.filter, time: options.time || 300000 })

            .on('collect', async (a) => {
                if (!a.isButton()) return;

                if (a.customId == `${action.id}-first_option`) {
                    embed = embeds[0];
                    a.update({ embeds: [embed] });
                }

                if (a.customId == `${action.id}-second_option`) {
                    embed = embeds[embeds.indexOf(embed) >= 1 ? embeds.indexOf(embed) - 1 : 0];
                    a.update({ embeds: [embed] });
                }

                if (a.customId == `${action.id}-third_option`) {
                    a.update({ components: [] });
                }

                if (a.customId == `${action.id}-fourth_option`) {
                    embed = embeds[embeds.indexOf(embed) < embeds.length - 1 ? embeds.indexOf(embed) + 1 : embeds.length - 1];
                    a.update({ embeds: [embed] });
                }

                if (a.customId == `${action.id}-fifth_option`) {
                    embed = embeds[embeds.length - 1];
                    a.update({ embeds: [embed] });
                }
            })

            .on('end', async () => {
                if (action.editReply) action.editReply({ components: [] });

                if (action.edit) await m.edit({ components: [] });
            })
    })();
}

/**
 * 
 * @param {Object} action - interaction or message event.
 * @param {Object} options - the normal message object, {content:"", embeds:[], components:[]}
 * @description a simple check function for checking if your message has been deferred, replied or not.
 * @returns a command reply.
 */
function reply(action, options = {}) {

    if (!options) throw new Error('Cannot send an empty message.');

    return action.replied || action.deferred ? action.editReply(options) : action.reply(options);
}

module.exports = {
    reply,
    selectMenuPaginator,
    buttonPaginator
}