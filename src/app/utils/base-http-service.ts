import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseHttpService {
    protected readonly baseUrl = 'https://hack4law-assistant-service.wittysea-0637102a.westeurope.azurecontainerapps.io/api';

    constructor(protected readonly httpClient: HttpClient) {
    }
}