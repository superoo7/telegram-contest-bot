const axios = require('axios');
const steem = require('steem');
const dotenv = require('dotenv');
const querystring = require('querystring');

dotenv.config();

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

      axios.post(
        `https://api.telegram.org/bot${
          process.env.BOT_KEY
        }/sendMessage`,
        querystring.stringify({
          chat_id: process.env.CHANNEL_ID,
          text: `https://steemit.com/${link}`
        })
      );
    }
  }
});
