export type SnakeToCamelString<S extends string> =
  S extends `${infer A}_${infer B}`
    ? SnakeToCamelString<`${A}${Capitalize<B>}`>
    : S;
export type SnakeToCamelObject<O extends Record<string, unknown>> = {
  [K in keyof O as SnakeToCamelString<string & K>]: O[K];
};

export const capitalize = <S extends string>(input: S): Capitalize<S> => {
  const [f, ...rest] = input;
  return `${f.toUpperCase()}${rest.join('')}` as Capitalize<S>;
};
export const snakeToCamelString = <S extends string>(
  input: S
): SnakeToCamelString<S> => {
  const [f, ...rest] = input.split('_');
  return `${f}${rest.map(capitalize).join('')}` as SnakeToCamelString<S>;
};
export const snakeToCamelObject = <O extends Record<string, unknown>>(
  input: O
): SnakeToCamelObject<O> => {
  return Object.fromEntries(
    Object.entries(input).map(([k, v]) => [snakeToCamelString(k), v])
  ) as SnakeToCamelObject<O>;
};
