import { describe, expect, it } from 'vitest';
import {
  capitalize,
  snakeToCamelObject,
  snakeToCamelString,
} from './snakeToCamel';

it('capitalize', () => {
  const testCases = [
    { input: 'a', expected: 'A' },
    { input: 'あ', expected: 'あ' },
    { input: 'aa', expected: 'Aa' },
  ];
  for (const testCase of testCases) {
    expect(capitalize(testCase.input)).toBe(testCase.expected);
  }
});

it('snakeToCamelString', () => {
  const testCases = [
    { input: 'a', expected: 'a' },
    { input: 'あ', expected: 'あ' },
    { input: 'aa', expected: 'aa' },
    { input: 'a_a', expected: 'aA' },
    { input: 'a_b_c', expected: 'aBC' },
    { input: 'aa_bb_cc', expected: 'aaBbCc' },
  ];
  for (const testCase of testCases) {
    expect(snakeToCamelString(testCase.input)).toBe(testCase.expected);
  }
});

it('snakeToCamelObject', () => {
  const testCases = [
    { input: { a: 0 }, expected: { a: 0 } },
    { input: { a_a: 0 }, expected: { aA: 0 } },
    { input: { a_b_c: 1 }, expected: { aBC: 1 } },
    { input: { aa_bb_cc: 'aa_bb_cc' }, expected: { aaBbCc: 'aa_bb_cc' } },
  ];
  for (const testCase of testCases) {
    expect(snakeToCamelObject(testCase.input)).toStrictEqual(testCase.expected);
  }
});
