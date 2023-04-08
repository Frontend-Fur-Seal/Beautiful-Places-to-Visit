class Api{
    constructor(config){
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
        
    }

_statusError(res){
  return res.ok ? res.json(): Promise.reject(res.status)
}

getInitialUser(){
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'GET',
    headers: this._headers
  })
  .then(res => this._statusError(res))
}

postInitialUser(data){
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then(res => this._statusError(res))
}

postInitialUserAvatar(data){
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then(res => this._statusError(res))
}

getInitialCards(){
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers
  })
  .then(res => this._statusError(res))
}
postInitialCard(data){
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify(data)
  })
  .then(res => this._statusError(res))
}

cardDelete(cardId){
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(res => this._statusError(res))
}

putLike(cardId){
  return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
    method: 'PUT',
    headers: this._headers
  })
  .then(res => this._statusError(res))
}

deleteLike(cardId){
  return fetch(`${this._baseUrl}/cards/${cardId}/likes `, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(res => this._statusError(res))
}

}

export default Api

