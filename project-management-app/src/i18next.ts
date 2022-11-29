import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        aboutTitle1: 'simplify work and get more done',
        aboutTitle2: `Plan, track, and manage any type of work with project management that flexes to your
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
        vitaliy: 'Vitaliy',
        katherina: 'Katherina',
        evgeniy: 'Evgeniy',
        aboutTeam:
          'Hello! We are a young and creative development team. We have created our project management system and implemented everything necessary for convenient work on team projects. You can find more information about each of us in our Github profiles',
        signIn: 'sign in',
        nameLabel: 'Name',
        loginLabel: 'Login',
        passwordLabel: 'Password',
        titleLabel: 'Title',
        descriptionLabel: 'Description',
        loginInputRequired: 'Please enter your login',
        loginInputRequired2: 'Login must contain at least 5 letters',
        passwordInputRequired: 'Please enter your password',
        passwordInputRequired2: 'Password must be received at least 6 characters',
        nameInputRequired: 'Please enter your name',
        nameInputRequired2: 'Name must contain at least 2 letters',
        nameInputRequired3: 'Name must contain only letters',
        titleRequiredTextError: 'Please enter title',
        titleMinLengthTextError: 'Title must be at least 2 characters',
        titleMaxLengthTextError: 'Title must be no more than 20 characters',
        descriptionRequiredTextError: 'Please enter description',
        descriptionMinLengthTextError: 'Description must be at least 2 characters',
        descriptionMaxLengthTextError: 'Description must be no more than 20 characters',
        signUp: 'sign up',
        signOut: 'sign out',
        goToMainPage: 'go to main page',
        createNewBoard: 'create new board',
        editProfile: 'edit profile',
        error409: 'User login already exists!',
        errorCommon: 'Bad Request!',
        error401: 'Wrong login or password!',
        errorUnAuth: 'Unauthorized!',
        error404: 'User was not founded!',
        error400: 'Validation failed (uuid is expected)!',
        error403: 'Invalid token!',
        error502: 'Bad Gateway!',
        error500: 'Internal server error!',
        deleteProfile: 'Delete profile',
        yourBoards: 'Your boards',
        noAvailableBoards: 'No available boards',
        createTitle: 'Create Board',
        createButton: 'Create',
        updateBoardTitle: 'Update Board',
        updateBoardButton: 'Update',
        backButton: 'Back',
        addColumnButton: 'Add column',
        addButton: 'Add',
        error: 'Page not found',
        allUsers: 'All board users',
      },
    },
    ru: {
      translation: {
        aboutTitle1: 'упростите работу и делайте больше',
        aboutTitle2:
          'Планируйте, отслеживайте и управляйте любыми типами работы с помощью управления проектами, которое подходит к потребностям вашей команды',
        benefitsTitle: 'преимущества использования',
        benefitLeftItem1: 'Управление бюджетом в режиме реального времени',
        benefitLeftItem2: 'Сбалансированное управление ресурсами',
        benefitLeftItem3: 'Эффективное общение',
        benefitLeftItem4: 'Легкое планирование проекта',
        benefitRightItem1: 'Надежная актуальная отчетность',
        benefitRightItem2: 'Прогнозирование конвейера',
        benefitRightItem3: 'Улучшенное сотрудничество в команде',
        benefitRightItem4: 'Повышение удовлетворенности клиентов',
        teamTitle: 'наша команда',
        vitaliy: 'Виталий',
        katherina: 'Катерина',
        evgeniy: 'Евгений',
        aboutTeam:
          'Привет! Мы молодая и креативная команда разработчиков. Мы создали свою систему управления проектами и внедрили все необходимое для удобной работы над командными проектами. Вы можете найти больше информации о каждом из нас в наших профилях Github',
        signIn: 'Войти',
        nameLabel: 'Имя',
        loginLabel: 'Логин',
        passwordLabel: 'Пароль',
        titleLabel: 'Название',
        descriptionLabel: 'Описание',
        loginInputRequired: 'Пожалуйста, введите ваш логин',
        loginInputRequired2: 'Логин должен содержать не менее 5 букв',
        passwordInputRequired: 'Пожалуйста, введите ваш пароль',
        passwordInputRequired2: 'Пароль должен содержать не менее 6 символов',
        nameInputRequired: 'Пожалуйста, введите ваше имя',
        nameInputRequired2: 'Имя должно содержать не менее 2 букв',
        nameInputRequired3: 'Имя должно содержать только буквы',
        titleRequiredTextError: 'Пожалуйста, введите название',
        titleMinLengthTextError: 'Название должно быть не менее 2 символов',
        titleMaxLengthTextError: 'Название должно быть не более 20 символов',
        descriptionRequiredTextError: 'Пожалуйста, введите описание',
        descriptionMinLengthTextError: 'Описание должно быть не менее 2 символов',
        descriptionMaxLengthTextError: 'Описание должно быть не более 80 символов',
        signUp: 'Создать аккаунт',
        signOut: 'выйти',
        goToMainPage: 'главная страница',
        createNewBoard: 'создать новую доску',
        editProfile: 'редактировать профиль',
        error409: 'Такой логин уже существует!',
        errorCommon: 'Неверный запрос!',
        error401: 'Неправильный логин или пароль!',
        errorUnAuth: 'Неавторизованный пользователь!',
        error404: 'Пользователь не найден!',
        error400: 'Ошибка проверки (ожидается UUID)!',
        error403: 'Недействительный токен!',
        error502: 'Плохое соединение!',
        error500: 'Внутренняя ошибка сервера!',
        deleteProfile: 'Удалить профиль',
        yourBoards: 'Ваши доски',
        noAvailableBoards: 'Нет доступных досок',
        createTitle: 'Создать доску',
        createButton: 'Создать',
        updateBoardTitle: 'Обновить доску',
        updateBoardButton: 'Обновить',
        backButton: 'Назад',
        addColumnButton: 'Добавить столбец',
        addButton: 'Добавить',
        error: 'Страница не найдена',
        allUsers: 'Все пользователи доски',
      },
    },
  },
  lng: localStorage.getItem('lng') || 'en',
});
export default i18n;
