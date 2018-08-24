export function makeUrl(base = 'http://localhost') {
  return new URL('api/v1', base).toString();
}

export const endpoint = (baseUrl, resource) => (id, method) => `${baseUrl}/${resource}/${id}/${method}`;


export async function handleResponse(response) {
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(`Server responded with non-ok code: ${response.status}`);
    }

    const obj = await response.json();

    throw new Error(obj.error);
  }

  return response.json();
}


export function team(baseUrl) {
  const url = endpoint(baseUrl, 'teams');

  return id => ({
    getMembers() {
      return fetch(url(id, 'members'))
        .then(handleResponse);
    },
  });
}


export function people(baseUrl) {
  const url = endpoint(baseUrl, 'people');

  return id => ({
    getTeams() {
      return fetch(url(id, 'teams'))
        .then(handleResponse);
    },
  });
}


export function clientFactory({ url }) {
  const base = makeUrl(url);

  return {
    team: team(base),
    people: people(base),
  };
}


export default clientFactory;
