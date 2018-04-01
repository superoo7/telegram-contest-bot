// lib
import * as steem from 'steem';
import dotenv = require('dotenv');

// src
import api from './api';
import save from './save';

dotenv.config();

interface TX_DATA {
  parent_author: string;
  parent_permlink: string;
  author: string;
  permlink: string;
  title: string;
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
      // @ts-ignore
      tags.includes('teammalaysia') && (tags.includes('contest') || tags.includes('raffle') || tags.includes('upfundme'))
    ) {
      save(`@${txData.author}/${txData.permlink}`)
        .then((isSaved) => {
          if (!!isSaved) {
            api(txData)
              .then(() => console.log('send to telegram'))
              .catch((err: any) => console.error(err));
          };
        })
    }
  }
});
