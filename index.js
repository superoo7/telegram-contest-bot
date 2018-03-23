const telegram = require('node-telegram-bot-api');
const steem = require('steem');
const dotenv = require('dotenv');

dotenv.config();

const bot = new telegram(process.env.BOT_KEY, {
  polling: true
});

steem.api.streamTransactions('head', function(err, result) {
  if (err) {
    return;
  }

  let txType = result.operations[0][0];
  let txData = result.operations[0][1];

  // Check a post and it is not being resteem
  if (txType === 'comment' && txData.parent_author === '') {
    let tags;

    try {
      tags = JSON.parse(txData.json_metadata).tags;
    } catch (e) {
      return;
    }

    if (
      tags.includes('contest') &&
      tags.includes('teammalaysia')
    ) {
      let link = `@${txData.author}/${txData.permlink}`;

      bot.sendMessage(
        process.env.CHANNEL_ID,
        `https://steemit.com/${link}`
      );
    }
  }
});
