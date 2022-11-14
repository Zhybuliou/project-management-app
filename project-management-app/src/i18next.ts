import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        aboutTitle1: 'simplify work and get more done',
        aboutTitle2: `plan, track, and manage any type of work with project management that flexes to your
        team's needs`,
        benefitsTitle: 'benefits of using',
        benefitLeftItem1: 'Real-time project budget management',
        benefitLeftItem2: 'Balanced resource management',
        benefitLeftItem3: 'Effective communication',
        benefitLeftItem4: 'Effortless project planning',
        benefitRightItem1: 'Solid up-to-the-minute reporting',
        benefitRightItem2: 'Pipeline forecasting',
        benefitRightItem3: 'Improved team collaboration',
        benefitRightItem4: 'Enhanced customer satisfaction',
        teamTitle: 'our team',
        vitaliy: 'vitaliy',
        katherina: 'katherina',
        evgeniy: 'evgeniy',
        signIn: 'sign in',
        signUp: 'sign up',
        signOut: 'sign out',
        goToMainPage: 'go to main page',
        createNewBoard: 'create new board',
        editProfile: 'edit profile',
      },
    },
    ru: {
      translation: {
        aboutTitle1: 'упростите работу и делайте больше',
        aboutTitle2:
          'планируйте, отслеживайте и управляйте любыми типами работы с помощью управления проектами, которое подходит к потребностям вашей команды',
        benefitsTitle: 'преимущества использования',
        benefitLeftItem1: 'Управление бюджетом проекта в режиме реального времени',
        benefitLeftItem2: 'Сбалансированное управление ресурсами',
        benefitLeftItem3: 'Эффективное общение',
        benefitLeftItem4: 'Легкое планирование проекта',
        benefitRightItem1: 'Надежная актуальная отчетность',
        benefitRightItem2: 'Прогнозирование конвейера',
        benefitRightItem3: 'Улучшенное сотрудничество в команде',
        benefitRightItem4: 'Повышение удовлетворенности клиентов',
        teamTitle: 'наша команда',
        vitaliy: 'виталий',
        katherina: 'катерина',
        evgeniy: 'евгений',
        signIn: 'войти',
        signUp: 'зарегестрироваться',
        signOut: 'выйти',
        goToMainPage: 'главная страница',
        createNewBoard: 'создать новую доску',
        editProfile: 'редактировать профиль',
      },
    },
  },
  lng: localStorage.getItem('lng') || 'en',
});
export default i18n;
