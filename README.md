# Contest Bot

This is a bot that watch for a certain tag and announce it at Telegram Broadcast Channel.

# Library used:

* node-telegram-bot-api
* steem
* dotenv

# Setup the bot

* install all dependencies (`npm install` or `yarn install`)

* create a `.env` file (refer to `.env.sample` )

```
CHANNEL_ID=-100<CHANNEL_KEY>
BOT_KEY=<BOT_API_KEY>
```

* depends on what tag you want to watch. (in this example, I use "teammalaysia" and "contest")

```
if (
      tags.includes('contest') &&
      tags.includes('teammalaysia')
    )
```

* To run it, just `node index.js`.

For production, you can use the PM2 library.
