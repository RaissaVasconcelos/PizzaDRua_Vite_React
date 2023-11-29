import { IHttpClient } from '../../../model/http/http-client'
import { AxiosHttpAdmin } from '../admin/axios-http-admin'

import { AxiosHttpClient } from '../client/axios-http-client'

export const ApiFactoryClient = (): IHttpClient => {
  return new AxiosHttpClient()
}

export const ApiFactoryAdmin = (): IHttpClient => {
  return new AxiosHttpAdmin()
}

