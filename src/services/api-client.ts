import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  results: T[];
  next?:string; // URL for the next page of results
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "4a518a2136f7499f942a7fd8dad6cc28",
  },
});
