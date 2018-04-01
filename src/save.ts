
import fs = require('fs');

export default async function save(link: string) {
    let fileName: string = 'data.json';
    let data = await readFile(fileName, link)
        .then(data => data)
        .catch((err) => false);
    return data;
}

export async function readFile(fileName: string, link: string) {
    // @ts-ignore
    let p = new Promise(function(resolve, reject) {
        fs.exists(fileName, function(exists){
            if(exists){
                let data: string[] = JSON.parse(fs.readFileSync(fileName, 'utf8'));
                let isLinkExist = data.filter(d => d === link);
                console.log(isLinkExist.length === 0);
                if (isLinkExist.length === 0) {
                    data = [...data, link];
                    fs.writeFile(fileName, JSON.stringify(data), 'utf8', function() {})
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                let json = [link];
                fs.writeFile(fileName, JSON.stringify(json), 'utf8', function() {});
                resolve(true);
            }
        })
    }).then(data => data)
    let result = await p.then(data => data);
    return result;
}