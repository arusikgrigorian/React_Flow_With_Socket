import { getUrlWithParams } from "@/utils/getUrlWithParams";
import { BASE_URL } from "@/constants";
import { REQUEST_INIT } from "@/services/rest/constants";
import { Param, Result } from "@/types";

type Option = {
  init: RequestInit;
};

class HttpClient {
  static readonly BASE_URL: string = BASE_URL;
  static readonly INIT: RequestInit = REQUEST_INIT;

  initialization: RequestInit;
  _token: string;

  constructor(options?: Option) {
    this.initialization = options?.init || HttpClient.INIT;
    this._token = "";
  }

  set token(token: string) {
    this._token = `Token ${token}`;
  }

  async _request<T = Result>(endpoint: string, params?: Param): Promise<T> {
    const url: URL = getUrlWithParams(
      `${HttpClient.BASE_URL}/${endpoint}`,
      params,
    );

    const init = {
      ...this.initialization,
      headers: { ...this.initialization.headers, Authorization: this._token },
    };

    const response: Response = await fetch(url, init);

    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  }

  get<T = Result>(endpoint: string, params?: Param): Promise<T> {
    return this._request(endpoint, params);
  }
}

const httpClient = new HttpClient();

export default httpClient;
