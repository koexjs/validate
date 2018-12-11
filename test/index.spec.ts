import * as Koa from 'koa';
import * as bodyParser from 'koa-body';
import onerror from '@zcorky/koa-onerror';
import * as router from '@koex/router';
import * as request from 'supertest';
import 'should';

import validate from '../src';

describe('koa validate', () => {
  it('work', () => {
    const app = new Koa();

    app.use(onerror({
      log: () => null,
    }));
    app.use(bodyParser());
    app.use(validate());

    app.use(router.post('/', async (ctx, next) => {
      ctx.validate({
        name: 'string',
        age: 'int',
      });

      await next();
    }, async ctx => {
      ctx.body = ctx.request.body;
    }));

    return request(app.listen())
      .post('/')
      .send({ name: 'name', age: 22 })
      .expect(422);
  });

  it('should 422', () => {
    const app = new Koa();

    app.use(onerror({
      log: () => null,
    }));
    app.use(bodyParser());
    app.use(validate());

    app.use(router.post('/', async (ctx, next) => {
      ctx.validate({
        name: 'string',
        age: 'int',
      });

      await next();
    }, async ctx => {
      ctx.body = ctx.request.body;
    }));

    return request(app.listen())
      .post('/')
      .send({ name: 'name', age: '22' })
      .expect(422, { message: 'Validation Failed' });
  });
});
