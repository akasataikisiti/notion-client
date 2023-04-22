import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from 'src/utils/authUtils';
import notionLogo from '../../assets/images/notion-logo-1.svg';
import Loading from '../common/Loading';

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JWTTを持っているのか確認
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        setLoading(false);
      } else {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);
  return loading ? (
    <>
      <Loading fullHeight />
    </>
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={notionLogo} alt="" style={{ width: 100, height: 100, marginBottom: 3 }} />
        Notionクローン開発
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
