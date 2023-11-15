import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  ShowNeighborhoodRequestDTO
} from '../neighborhood/dtos/response' 

export default class Service {
  httpClient = ApiFactory()

  public async showNeighborhood(): Promise<HttpResponse<ShowNeighborhoodRequestDTO>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/neighborhood',
    })
  }

  // public async createNeighborhood(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'post',
  //     url: '/neighborhood',
  //     body: data,
  //   })
  // }

  // public async updateNeighborhood(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'put',
  //     url: '/neighborhood',
  //     body: data,
  //   })
  // }

  // public async deleteNeighborhood(data: any): Promise<HttpResponse<any>> {
  //   return await this.httpClient.request({
  //     method: 'delete',
  //     url: `/neighborhood/${data.id}`,
  //   })
  // }
}