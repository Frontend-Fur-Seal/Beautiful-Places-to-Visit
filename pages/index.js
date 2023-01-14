function checkLike(){

let elementLike = document.querySelectorAll(".element__like");
for(let elem of elementLike){
    elem.addEventListener("change", function () {
        if(elem.checked){
            elem.parentNode.classList.add("element__like-label_active");
        }else{
            elem.parentNode.classList.remove("element__like-label_active");
        }
    });
}

}

checkLike();