import { IHttpClient } from '../../../model/http/http-client'

import { AxiosHttpClient } from '../client/axios-http-client'

const ApiFactory = (): IHttpClient => {
  return new AxiosHttpClient()
}

export default ApiFactory