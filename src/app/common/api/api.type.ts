import { HttpHeaders, HttpRequest } from '@angular/common/http';

export class ApiRequest {

  method: string;
  path: string;
  data: object;
  headers: object[] = [];

  constructor(method: string, path: string, data: any = {}) {
    this.method = method.toUpperCase();
    this.path = path;
    switch (this.method) {
      case 'POST':
        this.data = data;
        break;
      case 'GET':
        if (Object.keys(data).length > 0) {
          const queryString = [];
          for (const key of Object.keys(data)) {
            if (Array.isArray(data[key])) {
              data[key].forEach( item => {
                queryString.push(key + '[]=' + item);
              });
            } else {
              queryString.push(key + '=' + data[key]);
            }
          }
          this.path = this.path + '?' + queryString.join('&');
        }
        break;
    }
  }

  addHeaders(headers: any[]): void {
    for (const header of headers) {
      this.headers.push(header);
    }
  }

  getRequest(): HttpRequest<any> {
    const url = this.path;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');

    for (const header of this.headers) {
      headers = headers.set(Object.keys(header)[0], header[Object.keys(header)[0]]);
    }

    return new HttpRequest(
      this.method,
      url,
      this.data,
      {
        headers,
        responseType: 'json'
      }
    );
  }
}
