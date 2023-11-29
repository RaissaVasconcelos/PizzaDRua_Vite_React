import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'
import { AuthenticationRequestDTO } from './dtos/request'
import { AuthenticationResponseDTO } from './dtos/response'

export default class Service {
  httpClient = ApiFactory()

  public async authentication(data: AuthenticationRequestDTO): Promise<HttpResponse<AuthenticationResponseDTO>> {
    return await this.httpClient.request({
      method: 'post',
      url: '/sessions',
      body: data,
    })
  }



}