class UserInfo{ 
    constructor(personalDetails){ //передать сюда данные с сервера
    this._profileName = personalDetails.profileName; 
    this._profileOccupation = personalDetails.profileOccupation; 
    } 

    getUserInfo(){ 
     return{ 
        name: this._profileName.textContent, 
        occupation:this._profileOccupation.textContent 
     } 
    }

    setUserInfo(name, occupation){ 
        this._profileName.textContent = name; 
        this._profileOccupation.textContent = occupation; 

        
    } 
}

export default UserInfo 