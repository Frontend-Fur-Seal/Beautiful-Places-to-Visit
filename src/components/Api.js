class Api{
    constructor(config){
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
        
    }

getInitialUser(){
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  return Promise.reject(reason)
  })
}

getInitialCards(){
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  return Promise.reject(reason)
  })
}

}

export default Api

