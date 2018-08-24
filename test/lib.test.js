import {
  clientFactory,
  endpoint,
  handleResponse,
  makeUrl,
  people,
  team,
} from '../src';


const exampleUrl = 'https://example.com';

describe('makeUrl()', () => {
  it('returns URL with given base', () => {
    const url = makeUrl(exampleUrl);

    expect(url).toBe(`${exampleUrl}/api/v1`);
  });
});


describe('endpoint()', () => {
  it('returns a function', () => {
    expect(typeof endpoint()).toBe('function');
  });

  it('returned function gives correct path', () => {
    const result = endpoint('1', '2')('3', '4');

    expect(result).toBe('1/2/3/4');
  });
});


describe('handleResponse()', () => {
  it('calls \'json()\' if response is ok', async () => {
    const response = {
      ok: true,
      json: jest.fn(),
    };

    await handleResponse(response);

    expect(response.json).toHaveBeenCalled();
  });

  it('throws if status is >= 500', async () => {
    const response = {
      ok: false,
      status: 500,
    };

    expect(handleResponse(response)).rejects.toThrowError(/non-ok/);
  });

  it('throws if status is 400..499', async () => {
    const response = {
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'test' }),
    };

    expect(handleResponse(response)).rejects.toThrowError(/test/);
  });
});


describe('team()', () => {
  it('returns a function', () => {
    expect(typeof team(exampleUrl)).toBe('function');
  });

  it('this function contains \'getMembers\' method', () => {
    const r = team(exampleUrl);

    expect(typeof r().getMembers).toBe('function');
  });
});


describe('people()', () => {
  it('returns a function', () => {
    expect(typeof people(exampleUrl)).toBe('function');
  });

  it('this function contains \'getTeams\' method', () => {
    const r = people(exampleUrl);

    expect(typeof r().getTeams).toBe('function');
  });
});


describe('clientFactory()', () => {
  it('returns an object', () => {
    expect(typeof clientFactory({
      url: exampleUrl,
    })).toBe('object');
  });
});
