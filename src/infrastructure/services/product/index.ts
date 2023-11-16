import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  ShowProductsResponseDTO
} from '../product/dtos/response' 

export default class Service {
  httpClient = ApiFactory()

  public async showProduct(): Promise<HttpResponse<ShowProductsResponseDTO>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/product',
    })
  }

  // public async createProduct(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'post',
  //     url: '/product',
  //     body: data,
  //   })
  // }

  // public async updateProduct(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'put',
  //     url: '/product',
  //     body: data,
  //   })
  // }

  // public async deleteNeighborhood(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'delete',
  //     url: `/product/${data.id}`,
  //   })
  // }
}