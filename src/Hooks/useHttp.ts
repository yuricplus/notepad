import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function useHttp(method: string, url: string, body?: object, headers?:object){
   try {
     return await api[method](url, body, headers);
   } catch (error) {
     return error;
   }
}

