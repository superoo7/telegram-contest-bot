// import assert = require('assert');
import dotenv = require('dotenv');
import * as querystring from 'querystring';

// src
import api from '../api';
import {readFile} from '../save';

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


let data: TX_DATA = {
    parent_author: "",
    parent_permlink: "",
    author: "superoo7",
    permlink: "",
    title: "",
    body: "",
    json_metadata: ""
};

api(data)
    .then(() => console.log("Telegram API pass"))
    .catch(err => console.error(err));

console.log('[Test]: Save test');

readFile('./data.json', '@superoo7/ad')
    .then((res) => console.log(res));