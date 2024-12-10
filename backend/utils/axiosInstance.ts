import axios
  from "axios";

class ApiClient {
  private callAPI = async (url: string, method: string, data: any) => {
    let headers: any = {
      'Content-Type': 'application/json',
    };
    const axiosClient = await axios({ method: method, url: url, data: data, headers: headers });
    return axiosClient
  }

  protected async get<T>(url: string): Promise<T> {
    const response = await this.callAPI(url, "GET", {});
    return response.data ?? response;
  }
  protected async post<T>(
    url: string,
    data: any
  ): Promise<T> {
    const response = await this.callAPI(url, "POST", data);
    return response.data ?? response;
  }
}
export default ApiClient;