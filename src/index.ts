import axios from 'axios';
import * as steem from 'steem';
import dotenv = require('dotenv');
import * as querystring from 'querystring';

dotenv.config();

interface TX_DATA {
  parent_author: string;
  parent_permlink: string;
  author: string;
  permlink: string;
  body: string;
  json_metadata: string;
}

steem.api.streamTransactions('head', function(err, result) {
  if (err) {
    return;
  }

  let txType: string = result.operations[0][0];
  let txData: TX_DATA = result.operations[0][1];

  // Check a post and it is not being resteem
  if (txType === 'comment' && txData.parent_author === '') {

    let tags: string[];

    try {
      tags = JSON.parse(txData.json_metadata).tags;
    } catch (e) {
      return;
    }

    if (
      tags.includes('contest') &&
      tags.includes('teammalaysia')
    ) {
      let link: string = `@${txData.author}/${txData.permlink}`;

      let {BOT_KEY: botKey, CHANNEL_ID: chatId} = process.env;

      axios.post(
        `https://api.telegram.org/bot${
          process.env.botKey
        }/sendMessage`,
        querystring.stringify({
          chat_id: chatId,
          text: `https://steemit.com/${link}`
        })
      ).then(
        () => console.log('success')
      ).catch((err) => console.error(err));

    }
  }
});
