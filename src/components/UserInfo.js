class UserInfo{
    constructor({profileName, profileOccupation}){
    this._profileName = document.querySelector(profileName);
    this._profileOccupation = document.querySelector(profileOccupation);

    }

    getUserInfo(){
     return{
        profileName: this._profileName.textContent,
        profileOccupation:this._profileOccupation.textContent
     }
    }
    
    setUserInfo(name, occupation){
        this._profileName.textContent = name;
        this._profileOccupation.textContent = occupation;
    }
}

export default UserInfo