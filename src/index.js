function makeUrl(base = 'http://localhost') {
  return new URL('api/v1', base).toString();
}

const endpoint = (baseUrl, resource) => (id, method) => `${baseUrl}/${resource}/${id}/${method}`;


async function handleResponse(response) {
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(`Server responded with non-ok code: ${response.status}`);
    }

    const obj = await response.json();

    throw new Error(obj.error);
  }

  return response.json();
}


function team(baseUrl) {
  const url = endpoint(baseUrl, 'teams');

  return id => ({
    getMembers() {
      console.log(url(id, 'members'));

      return fetch(url(id, 'members'))
        .then(handleResponse);
    },
  });
}


function people(baseUrl) {
  const url = endpoint(baseUrl, 'people');

  return id => ({
    getTeams() {
      return fetch(url(id, 'teams'))
        .then(handleResponse);
    },
  });
}


function clientFactory({ url }) {
  const base = makeUrl(url);

  return {
    team: team(base),
    people: people(base),
  };
}


export default clientFactory;
