import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRequest } from './api.type';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) {
  }

  call(apiCall: ApiRequest): Promise<any> {
    const request = apiCall.getRequest();

    return this.http.request(request.method, request.url, {
      body: request.body,
    }).toPromise()
      .then(resp => resp)
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
