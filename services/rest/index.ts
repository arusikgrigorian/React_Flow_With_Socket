import { getUrlWithParams } from "@/utils/getUrlWithParams";
import { BASE_URL, TOKEN } from "@/constants";
import { REQUEST_INIT } from "@/services/rest/constants";
import { Param, HttpResult } from "@/types";

type Option = {
  init: RequestInit;
};

class HttpClient {
  static readonly BASE_URL: string = BASE_URL;
  static readonly INIT: RequestInit = REQUEST_INIT;

  init: RequestInit;
  _token: string;

  constructor(options?: Option) {
    this.init = options?.init || HttpClient.INIT;
    this._token = `Token ${TOKEN}`;
  }

  // TODO uncomment if cookies are not being used and the token should be set outside
  // set authToken(token: string) {
  //   this._token = `Token ${token}`;
  // }

  async _request<T = HttpResult>(endpoint: string, params?: Param): Promise<T> {
    const url = getUrlWithParams(HttpClient.BASE_URL, endpoint, params);
    const headers = { ...this.init.headers, Authorization: this._token };
    const init = { ...this.init, headers };

    const response: Response = await fetch(url, init);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  }

  get<T = HttpResult>(endpoint: string, params?: Param): Promise<T> {
    return this._request(endpoint, params);
  }
}

const httpClient = new HttpClient();

export default httpClient;
