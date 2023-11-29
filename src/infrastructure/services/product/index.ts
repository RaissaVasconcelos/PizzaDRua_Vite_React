import { ApiFactoryAdmin } from '../../http/factories/ApiFactory'
import { HttpResponse } from '../../../model/http/http-client'

import {
  ProductsResponseDTO
} from '../product/dtos/response' 
import { DeleteProductRequestDTO, ProductRequestDTO, UpdateProductRequestDTO } from './dtos/request'

export default class Service {
  httpAdmin = ApiFactoryAdmin()

  public async showProduct(): Promise<HttpResponse<ProductsResponseDTO[]>> {
    return await this.httpAdmin.request({
      method: 'get',
      url: '/product',
    })
  }

  public async RegisterProduct(data: ProductRequestDTO): Promise<void> {
    await this.httpAdmin.request({
      method: 'post',
      url: '/product',
      body: data,
    })
  }

  public async updateProduct(data: UpdateProductRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpAdmin.request({
      method: 'put',
      url: '/product',
      body: data,
    })
  }

  public async deleteProduct(data: DeleteProductRequestDTO): Promise<HttpResponse<void>> {
    return await this.httpAdmin.request({
      method: 'delete',
      url: `/product/${data.id}`,
    })
  }
}