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

postInitialUser(data){
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  return Promise.reject('reason')
  })
}

postInitialUserAvatar(data){
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  return Promise.reject('reason')
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
postInitialCard(data){
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    if(res.ok){
      return res.json();
    }
  return Promise.reject(reason)
  })
}

cardDelete(cardId){
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
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

