class Api{
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
        
    }

  initialUser(personalDetails){
    fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => res.json())
    .then((result) => {
    personalDetails.profileName.textContent = result.name;
    personalDetails.profileOccupation.textContent =  result.about;
    personalDetails.avatar.src = result.avatar;
  })
}



}

export default Api