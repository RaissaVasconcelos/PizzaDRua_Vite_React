import { ApiFactoryAdmin, ApiFactoryClient } from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'
import { CreateOrderRequestDTO, OrderDateRequestDTO } from './dtos/request'
import { ShowOrdersResponseDTO } from './dtos/response'
import { ShowOrdersDateResponseDTO } from './dtos/response/show-orders-date-response-dto'
import { UpdateOrderRequestDTO } from './dtos/request/update-order-request-dto'



export default class ServiceOrder {
  httpClient = ApiFactoryClient()
  httpAdmin = ApiFactoryAdmin()

  async showOrdersCustomer(): Promise<HttpResponse<ShowOrdersResponseDTO[]>> {
    return await this.httpClient.request({
      method: 'get',
      url: '/order',
    })
  }

  async showOrdersAdmin(): Promise<HttpResponse<ShowOrdersResponseDTO[]>> {
    return await this.httpAdmin.request({
      method: 'get',
      url: '/fetch-orders',
    })
  }


  async showOrdersDateAdmin(data: OrderDateRequestDTO): Promise<HttpResponse<ShowOrdersDateResponseDTO[]>> {
    return await this.httpAdmin.request({
      method: 'post',
      url: '/date-order',
      body: data,
    })
  }

  async createOrder(data: CreateOrderRequestDTO): Promise<HttpResponse<ShowOrdersResponseDTO>> {
    return await this.httpClient.request({
      method: 'post',
      url: '/order',
      body: data,
    })
  }

  async updateOrderCustomer(data: UpdateOrderRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpClient.request({
      method: 'put',
      url: '/order',
      body: data,
    })
  }

  async updateOrderAdmin (data: UpdateOrderRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpAdmin.request({
      method: 'put',
      url: '/order',
      body: data,
    })
  }
}