class UserInfo{ 
    constructor(personalDetails){
    this._profileName = personalDetails.profileName; 
    this._profileOccupation = personalDetails.profileOccupation; 
    this._profileAvatar = personalDetails.avatar;
    } 

    setUserInfo(name, occupation){ 
        this._profileName.textContent = name; 
        this._profileOccupation.textContent = occupation;         
    } 

    setUserAvatar(avatar){
        this._profileAvatar.src = avatar;
    }
}

export default UserInfo 

