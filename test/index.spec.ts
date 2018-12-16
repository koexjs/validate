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
      await ctx.validate({
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
      .expect(200);
  });

  it('should 422', () => {
    const app = new Koa();

    app.use(onerror({
      log: () => null,
    }));
    app.use(bodyParser());
    app.use(validate());

    app.use(router.post('/', async (ctx, next) => {
      await ctx.validate({
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

  it('return body', () => {
    const app = new Koa();
    app.use(onerror({
      log: () => null,
    }));
    app.use(bodyParser());
    app.use(validate());

    app.use(router.post('/', async (ctx) => {
      const { name, age } = await ctx.validate<any, {
        name: string;
        age: number;
      }>({
        name: 'string',
        age: 'int',
      });

      ctx.body = {
        name,
        age,
      };
    }));

    return request(app.listen())
      .post('/')
      .send({ name: 'name', age: 22 })
      .expect(200, { name: 'name', age: 22 });
  });
});
