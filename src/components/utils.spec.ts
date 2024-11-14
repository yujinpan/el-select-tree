import { describe, expect, it } from 'vitest';

import { compareArrayChanges, getParentKeys } from './utils';

describe('utils', () => {
  it('should getParentKeys', () => {
    expect(
      getParentKeys(['1'], [{ value: '1' }], (prop, data) => data[prop]),
    ).toEqual([]);
    expect(
      getParentKeys(
        ['2'],
        [{ value: '1', children: [{ value: '2' }] }],
        (prop, data) => data[prop],
      ),
    ).toEqual(['1']);
    expect(
      getParentKeys(
        ['3'],
        [
          {
            value: '1',
            children: [{ value: '2', children: [{ value: '3' }] }],
          },
        ],
        (prop, data) => data[prop],
      ),
    ).toEqual(['1', '2']);
    expect(
      getParentKeys(
        ['3'],
        [
          { value: 'else1', children: [{ value: 'else2' }] },
          {
            value: '1',
            children: [
              { value: 'else3', children: [{ value: 'else4' }] },
              { value: '2', children: [{ value: '3' }] },
            ],
          },
        ],
        (prop, data) => data[prop],
      ),
    ).toEqual(['1', '2']);
  });
  it('should compareArrayChanges', () => {
    expect(compareArrayChanges([], [])).toEqual({
      add: [],
      remove: [],
    });
    expect(compareArrayChanges([], [1])).toEqual({
      add: [1],
      remove: [],
    });
    expect(compareArrayChanges([], [1, 2])).toEqual({
      add: [1, 2],
      remove: [],
    });
    expect(compareArrayChanges([1], [1, 2])).toEqual({
      add: [2],
      remove: [],
    });
    expect(compareArrayChanges([1, 2], [1, 2])).toEqual({
      add: [],
      remove: [],
    });
    expect(compareArrayChanges([1, 2], [1])).toEqual({
      add: [],
      remove: [2],
    });
    expect(compareArrayChanges([1, 2], [1])).toEqual({
      add: [],
      remove: [2],
    });
  });
});
