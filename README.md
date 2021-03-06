# dumdiscord.js

## Functions

### selectMenuPaginator

A select menu paginator. Builds an index embed and a select menu for you, unless you specify other options.

Works for both interaction and message events.

| Parameter | Type   | Optional | Default | Description                   | min | max |
| --------- | ------ | -------- | ------- | ----------------------------- | --- | --- |
| action    | Object | false    |         | Interaction or message event. | 1   | 1   |
| embeds    | Array  | false    |         | An array of embeds.           | 1   | 25  |
| options   | Object | true     | {}      | An object of options.         |

| Option | Type               | Default                           | Description                                                          | min | max |
| ------ | ------------------ | --------------------------------- | -------------------------------------------------------------------- | --- | --- |
| index  | Discord Embed      | titled and descriptive embed      | Sets the index embed                                                 |
| row    | Discord Action Row | labeled and descriptive component | Sets the select menu's options                                       |
| id     | string             | `<action ID>-menu`                | Sets the custom ID for the action row                                |
| filter | function           |                                   | Sets a filter function for conditions to interact with the paginator |
| time   | number             | 300000                            | Sets a time of when the collector should end (ms)                    | 0   | +   |
| send   | boolean            | false                             | Whether the paginator should be a reply or not.                      |

### buttonPaginator

A button paginator. Builds a button paginator for you, you can specify other emotes with options.

Works for both interaction and message events.

| Parameter | Type   | Optional | Default | Description                   | min | max |
| --------- | ------ | -------- | ------- | ----------------------------- | --- | --- |
| action    | Object | false    |         | Interaction or message event. | 1   | 1   |
| embeds    | Array  | false    |         | An array of embeds.           | 1   | 25  |
| options   | Object | true     | {}      | An object of options.         |

| Option  | Type     | Default                      | Description                                                          | min | max                           |
| ------- | -------- | ---------------------------- | -------------------------------------------------------------------- | --- | ----------------------------- |
| buttons | array    | "⏪", "◀️", "⏹️", "▶️", "⏩" | Sets the emotes for the buttons.                                     | 5   | 5                             |
| index   | number   | 0                            | Sets the index embed                                                 | 0   | max length of the embed array |
| filter  | function |                              | Sets a filter function for conditions to interact with the paginator |
| time    | number   | 300000                       | Sets a time of when the collector should end (ms)                    | 0   | +                             |
| send    | boolean  | false                        | Whether the paginator should be a reply or not.                      |

### reply

A simple reply checker for deferred and replied messages, or neither.

This works for both interaction and message events.

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| action    | Object | Interaction or message event.    |
| options   | Object | Your standard discord.js message |
