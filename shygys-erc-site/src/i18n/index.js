import { createI18n } from 'vue-i18n';
import cookies from "/src/cookies"

const savedLocale = cookies.getValue('curlang') || 'ru'

const messages = {
  ru: {
    personalAccount: 'Личный кабинет',    
    titleBrow: 'ЕРЦ',
    about: 'О предприятии',
    feedback: 'Задать вопрос',
    home: 'Главная',
    hasquestion: 'Отзыв на баленсиагу',
    yourName: 'Ваше имя',
    yourEmail: 'E-mail',
    textReply: 'Текст отзыва',
    send: 'Отправить',
    autorizationPlease: 'Авторизуйтесь',
    yourLS: 'Лицевой счет ЕРЦ',
    yourPassword: 'Пароль',
    go: 'Войти',
    registration: 'Регистрация',
    registrationTitle: 'Регистрация',
    passwordLength: '* пароль должен быть не менее 8 символов длиной',
    yourPassword2: 'Подтверждение пароля',
    registrationZa: 'Зарегистрироваться',
    recoverPasswordTitle: 'Восстановление пароля',
    or: 'или',
    recoverPasswordTitleInfo: 'Введите номер Вашего лицевого счета или адрес электронной почты. Код для смены пароля будет выслан на E-Mail.'
  },
  kz: {
    personalAccount: 'Жеке кабинет',    
    titleBrow: 'ЕРЦ',
    about: 'Предприятие неге',
    feedback: 'Сурак бар',
    home: 'Уйде',
    hasquestion: 'Сурагы бересiн бе',
    yourName: 'Сиздин аты',
    yourEmail: 'E-mail',
    textReply: 'Мынау не',
    send: 'Берши',
    autorizationPlease: 'Авторизалык',
    yourLS: 'Лицевой счеты ЕРЦ',
    yourPassword: 'Пароль кайда',
    go: 'Келесин бе',
    registration: 'Регистрациясы',
    registrationTitle: 'Регистрациясы',
    passwordLength: '* пароль короткий емес',
    yourPassword2: 'Подтверждение жиесть',
    registrationZa: 'Регистрация келесин',
    recoverPasswordTitle: 'Пароль переделай',
    or: 'немесе',
    recoverPasswordTitleInfo: 'Kz Введите номер Вашего лицевого счета или адрес электронной почты. Код для смены пароля будет выслан на E-Mail.'
  }
}

const i18n = createI18n({
  legacy: false,  // Использование Composition API
  locale: savedLocale,   // Язык по умолчанию
  messages,       // Сообщения с переводами
});

export default i18n; // Экспортируем экземпляр i18n

