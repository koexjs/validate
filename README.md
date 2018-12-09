# koa-validate

[![NPM version](https://img.shields.io/npm/v/@zcorky/koa-validate.svg?style=flat)](https://www.npmjs.com/package/@zcorky/koa-validate)
[![Coverage Status](https://img.shields.io/coveralls/zcorky/koa-validate.svg?style=flat)](https://coveralls.io/r/zcorky/koa-validate)
[![Dependencies](https://david-dm.org/@zcorky/koa-validate/status.svg)](https://david-dm.org/@zcorky/koa-validate)
[![Build Status](https://travis-ci.com/zcorky/koa-validate.svg?branch=master)](https://travis-ci.com/zcorky/koa-validate)
![license](https://img.shields.io/github/license/zcorky/koa-validate.svg)
[![issues](https://img.shields.io/github/issues/zcorky/koa-validate.svg)](https://github.com/zcorky/koa-validate/issues)

> response time header for Koa.

### Install

```
$ npm install @zcorky/koa-validate
```

### Usage

```javascript
// See more in test
import * as bodyParser from 'koa-body';
import onerror from '@zcorky/onerror';
import validate from '@zcorky/koa-validate';
import * as router from '@zcorky/koa-router';

import * as Koa from 'koa';
const app = new Koa();

app.use(onerror());
app.use(bodyParse());
app.use(validate());

app.use(router.post('/', (ctx, next) => {
  ctx.validate({
    name: 'string',
    age: 'int',
  });
}, ctx => {
  ctx.body = ctx.request.body;
}));

app.listen(8000, '0.0.0.0', () => {
  console.log('koa server start at port: 8000');
});
```

### Related
* [koa-validate](https://github.com/koajs/validate)
* [egg-validate](https://github.com/eggjs/egg-validate)