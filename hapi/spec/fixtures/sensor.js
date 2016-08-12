module.exports = [
  {
    // 0. this one is VALID
    "name": "temperature",
    "systemId": "57a7a4b1ecbee37bcb6ca646",
    "measurement": 40,
    "type": 'sensor',
    "isTrusted": true
  },
  {
    // 1. invalid name
    "name": "",
    "systemId": "57a7a4b1a1837052d8e867dc",
    "measurement": 37,
    "isTrusted": true
  },
  {
    // 2. invalid systemId
    "name": "temperature",
    "systemId": undefined,
    "measurement": 34,
    "isTrusted": true
  },
  {
    // 3. invalid measurement
    "name": "temperature",
    "systemId": "57a7a4d7935b2b39ec1670b6",
    "measurement": 34,
    "isTrusted": true
  },
  {
    // 4. not trusted
    "name": "temperature",
    "systemId": "57a7a4d7f0fc19cff92e84f4",
    "measurement": 60,
    "isTrusted": false
  }
]
