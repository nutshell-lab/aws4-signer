import aws4 from 'aws4'
import fetch from 'node-fetch'
import urlNode from 'url'
import AWS from 'aws-sdk'

export const sign = async (method, url, headers, body) => {
  const parsedUrl = urlNode.parse(url)
  const path = `/${process.env.SLS_STAGE}${parsedUrl.path}`
  const hostname = await valueOfCustomHost(parsedUrl.host)
  if (!hostname)
    throw new Error(
      `[Signer] Unabled to retrieve url from custom domain name : ${
        parsedUrl.host
      }`
    )
  return aws4.sign(
    {
      body,
      headers,
      method,
      url: `${parsedUrl.protocol}//${hostname.Value}${path}`,
      service: 'execute-api',
      path: `${path}`,
      host: hostname.Value,
      region: process.env.AWS_REGION
    },
    {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN
    }
  )
}

export const hmacfetch = async (url, options) => {
  const { method, headers, body } = options
  const signedRequest = await sign(method, url, headers, body)
  return fetch(signedRequest.url, signedRequest)
}

const valueOfCustomHost = async host => {
  const data = await new AWS.SSM()
    .getParameters({
      Names: [host],
      WithDecryption: false
    })
    .promise()
  return data.Parameters.pop()
}
