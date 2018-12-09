import { Context, Middleware } from 'koa';
import * as Parameter from 'parameter';

declare module 'koa' {
  export interface Context {
    /**
     * validate the value conforms to rule. throw 422, 'Validation Failed', { code: 'invalid_param', errors }.
     * @param rules validate rules
     * @param data validate data
     * 
     * example:
     *  const rules = {
     *    name: 'foo',
     *    age: 24,
     *    gender: 'male',
     *  };
     * 
     *  const data = {
     *    name: 'string',
     *    age: 'int',
     *    gender: ['male', 'female', 'unknown'],
     *  };
     * 
     *  validate(rules, data);
     */
    validate: <R, D>(rules: R, data?: D) => void;
  }
}

export interface Options {
  /**
   * translate function.
   */
  translate?: (message: string, ...params: any[]) => string;
  
  /**
   * config whether to validate the passed in value must be object, default to `false`.
   */
  validateRoot?: boolean;

  /**
   * convert primitive params to specific type, default to `false`.
   */
  convert?: boolean;

  /**
   * convert empty string(''), NaN, Null to undefined,
   * the option can make `rule.required` more powerful, default to `false`.
   * Notice: This may change the original input params.
   */
  widelyUndefined?: boolean;
}

/**
 * Add X-Response-Time header field.
 */
export default (options?: Options): Middleware => {
  const validator = new Parameter(options);

  return async function koaEjs(ctx: Context, next: () => Promise<void>) {
    if (!ctx.validate) {
      ctx.validate = (rules, data) => {
        const _data = data || (ctx.request as any).body;
        const errors = validator.validate(rules, _data);

        ctx.throw(422, 'Validation Failed', {
          code: 'invalid_param',
          errors,
        });
      };
    }

    await next();
  };
};
