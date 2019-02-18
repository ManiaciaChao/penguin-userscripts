// ==UserScript==
// @name         baiduReplacer
// @name:zh-CN   我不想让你用百度
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  replace Baidu with Google or Bing
// @description:zh-cn 使用Google或Bing替代百度
// @author       maniacata
// @match        http*://www.baidu.com/*
// @match        http*://m.baidu.com/*
// @run-at document-start
//
// ==/UserScript==

document.write(''); // To avoid Baidu homepage's loading

const baiduReplacer = {
    https: 'https://',

    hostUrl: {
        google: 'www.google.com',
        bing: 'www.bing.com'
    },

    keyword: null,

    init() {
        this.keyword =
            location.hostname !== 'm.baidu.com'
                ? this.getUrlQuery('wd')
                : this.getUrlQuery('word');
        document.body.appendChild(this.getGoogleIcon());
    },

    getUrlQuery(key) {
        const keyVaules = window.location.search.substring(1).split('&');
        let res;
        keyVaules.forEach(kvStr => {
            let kv = kvStr.split('=');
            if (kv[0] == key) {
                res = kv[1];
            }
        });
        return res || null;
    },

    getGoogleIcon() {
        const iconElement = document.createElement('img');
        iconElement.src = `${this.https}${this.hostUrl.google}/favicon.ico`;
        iconElement.style.display = 'none';
        // When failed, jump to Bing
        iconElement.addEventListener('error', err =>
            this.jump(this.hostUrl.bing)
        );
        iconElement.addEventListener('load', data =>
            this.jump(this.hostUrl.google)
        );
        return iconElement;
    },
    jump(host) {
        location.href = this.keyword
            ? `${this.https}${host}/search?q=${this.keyword}`
            : (location.href = `${this.https}${host}`);
    }
};

baiduReplacer.init();
