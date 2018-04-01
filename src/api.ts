import axios from 'axios';
import * as querystring from 'querystring';


interface TX_DATA {
    parent_author: string;
    parent_permlink: string;
    author: string;
    permlink: string;
    title: string;
    body: string;
    json_metadata: string;
  }

export default async function api(data: TX_DATA) {
    let {BOT_KEY: botKey, CHANNEL_ID: chatId}  = process.env;

    let link: string = `@${data.author}/${data.permlink}`;
    console.log(`link: ${link}`);
    return await axios.post(
        `https://api.telegram.org/bot${
          botKey
        }/sendMessage`,
        toQueryString(chatId, data, link)
      ).then(
        () => console.log('success')
      ).catch((err) => console.error(err));
}

export function toQueryString(chatId: string|undefined, data: TX_DATA, link: string): string {
    return querystring.stringify({
        chat_id: chatId,
        text: `"${data.title}" by ${data.author}\nhttps://steemit.com/${link}`
      })
}