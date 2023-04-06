class UserInfo{ 
    constructor(personalDetails){ 
    this._profileName = personalDetails.profileName; 
    this._profileOccupation = personalDetails.profileOccupation; 
    } 

    setUserInfo(name, occupation){ 
        this._profileName.textContent = name; 
        this._profileOccupation.textContent = occupation; 
   
    } 
}

export default UserInfo 