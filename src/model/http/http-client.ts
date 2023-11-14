export type IHttpMethod = 'post' | 'get' | 'put' | 'delete'

export type IHttpRequest = {
  url: string
  method: IHttpMethod
  body?: any
  params?: any
  headers?: any
}

export type HttpResponse< T = any > = {
  statusCode: number
  data: T
}

export interface IHttpClient<R = any> {
  request: (data: IHttpRequest) => Promise<HttpResponse<R>> 
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  rule = 406,
  validation = 422,
  serverError = 500,
  serviceUnavailable = 503,
}