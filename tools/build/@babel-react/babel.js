"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const getBabelWebpackConfig = require('@nrwl/react/plugins/babel');
module.exports = function (config) {
    const cfg = getBabelWebpackConfig(config);
    var idx = cfg.module.rules.findIndex(function (r) {
        return r.use && r.use.loader === 'babel-loader';
    });
    var rule = cfg.module.rules[idx];
    if (rule) {
        rule.use.options.plugins = [
            require('babel-plugin-macros'),
            [require('@babel/plugin-proposal-decorators').default, {
                legacy: true
            }], // enable TS decorators\annotations
            require('babel-plugin-transform-class-properties') // hotfix error: "Missing class properties transform"
        ];
        cfg.module.rules.splice(idx, 1, rule);
    } else {
        console.warn('!!!!!!!!!  ATTENTION  !!!!!!!!');
        console.warn('* Invalid NRWL build process override *');
        console.warn('* Please take a look at ' + __filename + ' *');
        console.warn('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    return cfg;
};