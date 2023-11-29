import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  CreateAddressRequestDTO,
  DeleteAddressRequestDTO,
  UpdateAddressRequest,
} from '../address/dtos/request'

import {
  ShowListAddressResponse,
} from '../address/dtos/response' 

export default class Service {
  httpClient = ApiFactory()

  public async showAddress(): Promise<HttpResponse<ShowListAddressResponse[]>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/address',
    })
  }

  public async createAddress(data: CreateAddressRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'post',
      url: '/address',
      body: data,
    })
  }

  public async updateAddress(data: UpdateAddressRequest): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'put',
      url: '/address',
      body: data,
    })
  }

  public async deleteAddress(data: DeleteAddressRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'delete',
      url: `/address/${data.id}`,
    })
  }
}