import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  CreateAddressRequestDTO,
  DeleteAddressRequestDTO,
} from '../address/dtos/request'

import {
  ShowListAddressResponse,
  CreateAddressResponseDTO } from '../address/dtos/response' 

export default class Service {
  httpClient = ApiFactory()

  public async showAddress(): Promise<HttpResponse<ShowListAddressResponse>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/address',
    })
  }

  public async createAddress(data: CreateAddressRequestDTO): Promise<HttpResponse<CreateAddressResponseDTO>> {
    return await this.httpClient.request({
      method: 'post',
      url: '/address',
      body: data,
    })
  }

  public async updateAddress(data: any): Promise<HttpResponse<any>> {
    return await this.httpClient.request({
      method: 'put',
      url: '/address',
      body: data,
    })
  }

  public async deleteAddress(data: DeleteAddressRequestDTO): Promise<HttpResponse<any>> {
    return await this.httpClient.request({
      method: 'delete',
      url: '/address',
      params: data,
    })
  }
}