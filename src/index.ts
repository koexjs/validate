import { Context, Middleware } from 'koa';
import * as Parameter from 'parameter';

declare module 'koa' {
  export interface Context {
    /**
     * validate the value conforms to rule. throw 422, 'Validation Failed', { code: 'invalid_param', errors }.
     * @param schema validate schema
     * @param data validate data
     *
     * example:
     *  const schema = {
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
     *  validate(schema, data);
     */
    validate: <R, D>(schema: R, data?: D) => Promise<D>;
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
 * validate
 */
export default (options?: Options): Middleware => {
  const validator = new Parameter(options);

  const validateFn = async <R, D>(ctx: Context, schema: R, data?: D) => {
    const _data: D = data || (ctx.request as any).body;
    const errors = validator.validate(schema, _data);

    if (errors) {
      ctx.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }

    return _data;
  };

  return async function validate(ctx: Context, next: () => Promise<void>) {
    if (!ctx.validate) {
      ctx.validate = async <R, D>(schema: R, data?: D) => {
        return validateFn(ctx, schema, data);
      };
    }

    await next();
  };
};
