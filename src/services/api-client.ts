import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next?:string; // URL for the next page of results
}

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "4a518a2136f7499f942a7fd8dad6cc28",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  }

}

export default APIClient;