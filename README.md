# :fire: TeamsDB-client :eyes:

A simple client for the simple API.

## Building

```
npm run build
```

## Testing

```
npm test
```

## Usage

The entrypoint to the client is a factory, which returns an API object when provided with an API base URL.

```javascript
import clientFactory from 'teamsdb-client';

const api = clientFactory({ url: 'https://host' });
```

### The API object :metal:

This object gives access to all TeamsDB resources on a given URL. All methods return native Promises, so be sure to polyfill them beforehand if required.

Another requirement is the availability of [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

```javascript
const teamId = 42; // The A-Team
const personId = 5; // B.A. Baracus

const members = await api.team(teamId).members();
const teams = await api.people(personId).teams();
```
