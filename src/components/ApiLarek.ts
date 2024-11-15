 import { ApiPostMethods } from './base/api';
import { Api, ApiListResponse } from './base/api'
import { IProduct, IOrderResponse } from '../types';

export class ApiLarek extends Api {
 readonly cdn: string;

 constructor( baseUrl: string, cdn: string, options?: RequestInit) {
     super(baseUrl, options);
     
     this.cdn = cdn;
 }

 getProductsItem() {
        return this.get('/product')
          .then((data: ApiListResponse<IProduct>) => {
            
            return data.items.map((item) => ({ ...item }))
          })
      }

 orderProductsResponse(order: IOrderResponse) {
     return this.post('/order', order).then((data: IOrderResponse) => data);
 }
}
