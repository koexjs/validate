# validate

[![NPM version](https://img.shields.io/npm/v/@koex/validate.svg?style=flat)](https://www.npmjs.com/package/@koex/validate)
[![Coverage Status](https://img.shields.io/coveralls/koexjs/validate.svg?style=flat)](https://coveralls.io/r/koexjs/validate)
[![Dependencies](https://img.shields.io/david/koexjs/validate.svg)](https://github.com/koexjs/validate)
[![Build Status](https://travis-ci.com/koexjs/validate.svg?branch=master)](https://travis-ci.com/koexjs/validate)
![license](https://img.shields.io/github/license/koexjs/validate.svg)
[![issues](https://img.shields.io/github/issues/koexjs/validate.svg)](https://github.com/koexjs/validate/issues)

> validate for koa extend.

### Install

```
$ npm install @koex/validate
```

### Usage

```javascript
// See more in test
import * as bodyParser from 'koa-body';
import onerror from '@zcorky/onerror';
import validate from '@koex/validate';
import * as router from '@koex/router';

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