import { Auth, Typography, Button } from '@supabase/ui';
import { LayoutWrapper } from 'src/components/LayoutWrapper';
import { client } from 'src/libs/supabase';

const Container = (props) => {
  const { user } = Auth.useUser();

  // ログインしている場合
  if (user) {
    return (
      <>
        <Typography.Text>login: {user.email}</Typography.Text>
        <Button block onClick={() => client.auth.signOut()}>
          Sign Out
        </Button>
      </>
    );
  }

  // ログインしていない場合
  return props.children;
};

const Home = () => {
  return (
    <LayoutWrapper>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container>
          <Auth
            supabaseClient={client}
            providers={['google', 'facebook', 'github']}
            socialColors={false}
          />
        </Container>
      </Auth.UserContextProvider>
    </LayoutWrapper>
  );
};

export default Home;
