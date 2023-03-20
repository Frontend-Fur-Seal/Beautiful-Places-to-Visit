  export const buttonNameChange = document.querySelector(".profile__button-name-change");
  export const buttonAddPlace = document.querySelector(".profile__button-add-place");
  export const formDetails = document.forms.persDetails;
  export const popupName = formDetails.querySelector(".popup__content_type_name");
  export const popupOccupation = formDetails.querySelector(".popup__content_type_occupation");
  export const elements = document.querySelector('.elements');
  export const popupFullPhoto = document.querySelector('.popup_full-img');
  export const popupChangeName = document.querySelector('.popup_name-change');
  export const popupAddPlace = document.querySelector('.popup_add-place');

  export const kolaPeninsula = new URL('../images/kola-peninsula.jpg', import.meta.url);
  export const ladoga = new URL('../images/ladozhskoe-ozero.jpg', import.meta.url);
  export const platoPutorana = new URL('../images/plato-putorana.jpg', import.meta.url);
  export const ruskeala = new URL('../images/ruskeala.jpg', import.meta.url);
  export const solovky = new URL('../images/solovky.jpg', import.meta.url);
  export const kamchatka = new URL('../images/kamchatka.jpg', import.meta.url)
  export const withoutImg = new URL('../images/not-photo.jpg', import.meta.url)

  export const initialCards = [
    {
      name: 'Кольский полуостров',
      link: kolaPeninsula
    },
    {
      name: 'Ладожское озеро',
      link: ladoga
    },
    {
      name: 'Плато-Путорана',
      link: platoPutorana
    },
    {
      name: 'Рускеала',
      link: ruskeala
    },
    {
      name: 'Соловецкие острова',
      link: solovky
    },
    {
      name: 'Камчатка',
      link: kamchatka
    }
  ]; 