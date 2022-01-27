
const fs = require('fs');
const fsPromise = require('fs').promises;
const localeMap = {
    ".com": "en-US",
    ".de": "de-DE",
    ".es": "es-ES"
}

export async function getContentBundle(req, bundleName) {
    let contentObj = {}, data;
    const locale = getLocale(req);
    if (locale) {
        try {
            data = await fsPromise.readFile(`./src/locale/${locale}/${bundleName}.properties`, 'utf8');
        } catch (err) {//fall back to US in case of empty bundle
            data = await fsPromise.readFile(`./src/locale/en-us/${bundleName}.properties`, 'utf8');
        }

        contentObj = convertFileToJSON(data);
    }
    return contentObj;
}

export function getLocale(req) {
    let locale = 'en-US'; //fall to US if there is no such locale
    for (let domain in localeMap) {
        if (req.hostname.indexOf(domain) > -1) {
            locale = localeMap[domain];
            break;
        }
    }
    return locale;
}

function convertFileToJSON(data) {
    let contentObj = {};

    let regEx = new RegExp('^[0-9]*$');
    data.split(/\r?\n/).forEach(line => {
        let contentList = line.split('.');
        let pointer = contentObj;
        if (contentList.length > 0) {
            contentList.forEach((element, index) => {
                element = element.trim();
                if (element.indexOf("=") > -1) {
                    let temp = element.split('=');
                    temp[0] = temp[0].trim();
                    temp[1] = temp[1].trim();
                    if (regEx.test(temp[0])) {
                        pointer.push(temp[1]);
                    } else {
                        pointer[temp[0]] = temp[1];
                    }

                } else if (!pointer[element]) {

                    if (contentList[index + 1]) {
                        if (regEx.test(contentList[index + 1])) {
                            pointer[element] = [];
                        } else if (contentList[index + 1].indexOf("=") > -1) {
                            let temp = contentList[index + 1].split('=');
                            if (regEx.test(temp[0].trim())) {
                                pointer[element] = [];
                            } else {
                                pointer[element] = {};
                            }
                        }
                    }

                }
                pointer = pointer[element];
            });
        }
    });
    return contentObj;
}