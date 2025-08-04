import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import errorImg from '../assets/404.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img
        alt={t('pageNotFound') || 'Страница не найдена'}
        className="img-fluid h-25"
        src={errorImg}
      />
      <h1 className="h4 text-muted">
        {t('pageNotFound') || 'Страница не найдена'}
      </h1>
      <p className="text-muted">
        {t('butYouCanGoTo') || 'Но вы можете перейти'}
        {' '}
        <Link to="/">
          {t('toMainPage') || 'на главную страницу'}
        </Link>
      </p>
    </div>
  )
}

export default NotFoundPage
