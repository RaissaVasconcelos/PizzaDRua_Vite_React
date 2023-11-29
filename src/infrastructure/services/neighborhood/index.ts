import ApiFactory from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  ShowNeighborhoodResponseDTO
} from '../neighborhood/dtos/response' 
import { DeleteNeighborhoodRequestDTO, RegisterNeighborhoodRequestDTO, UpdateNeighborhoodRequestDTO } from './dtos/request'

export default class Service {
  httpClient = ApiFactory()

  public async showNeighborhood(): Promise<HttpResponse<ShowNeighborhoodResponseDTO[]>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/neighborhood',
    })
  }

  public async createNeighborhood(data: RegisterNeighborhoodRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'post',
      url: '/neighborhood',
      body: data,
    })
  }

  public async updateNeighborhood(data: UpdateNeighborhoodRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'put',
      url: '/neighborhood',
      body: data,
    })
  }

  public async deleteNeighborhood(data: DeleteNeighborhoodRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'delete',
      url: `/neighborhood/${data.id}`,
    })
  }
}