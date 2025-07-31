import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="h-100 d-flex flex-column">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">{t('notFound')}</h2>
          <Button variant="primary" onClick={handleGoHome}>
            {t('backToMain')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
