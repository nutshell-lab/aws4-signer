# node-aws-signer

> Just a nodejs wrapper over AWS4 signer


## Install

```
$ yarn add @nutshelllab/node-aws-signer
```


## Usage

```js
import sign from '@nutshelllab/node-aws-signer'

(async () => {
  const method = 'POST'
  const url = 'https://api.behindawsgateway.com/resources'
  const headers = { from: 'my-super-app' }
  const body = { name: 'MyResource' }
  
  const signedRequest = await sign(method, url, headers, body)
  return fetch(signedRequest.url, signedRequest)
})
```


## API

### sign(method, url, headers, body)

#### method

Type: `string`

HTTP method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, ...).

##### url

Type: `string`

Request endpoint.

##### headers

Type: `Object`

Headers to be added to the request.

##### body

Type: `Object`

Request JSON payload.


## License

MIT © [Nutshell](https://nutshell-lab.com)
