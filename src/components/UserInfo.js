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
    
    getUserInfo(){
        return{
            name: this._profileName.textContent,
            about: this._profileOccupation.textContent,
            avatar: this._profileAvatar.src
        }
    }
}

export default UserInfo 

