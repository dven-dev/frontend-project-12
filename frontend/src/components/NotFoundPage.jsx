import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={6} className="text-center">
          <img 
            alt={t('pageNotFound') || 'Страница не найдена'} 
            className="img-fluid h-25" 
            src="./assets/404.svg"
          />
          <h1 className="h4 text-muted mt-4">
            {t('pageNotFound') || 'Страница не найдена'}
          </h1>
          <p className="text-muted">
            {t('butYouCanGoTo') || 'Но вы можете перейти'}{' '}
            <Link to="/">
              {t('toMainPage') || 'на главную страницу'}
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
