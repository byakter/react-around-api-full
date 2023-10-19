import Api, {customFetch} from "./api";


class Auth extends Api{
    register (email, password) {
        return customFetch(`${this._baseUrl}/signup`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
      }
      login (email, password) {
        return customFetch(`${this._baseUrl}/signin`, {
          headers: this._headers,
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
      }
}

export const auth = new Auth({
    baseUrl: "https://api.byakter.chickenkiller.com",
    // baseUrl:'http://localhost:5000',
    headers: {
      authorization: "5dce2cef-3614-4677-836d-e6e3b236af3f",
      "Content-Type": "application/json",
    },
  });
