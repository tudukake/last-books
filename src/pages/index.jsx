import { Auth, Typography, Button } from '@supabase/ui';
import { LayoutWrapper } from 'src/components/LayoutWrapper';
import { client } from 'src/libs/supabase';

const Container = (props) => {
  const { user } = Auth.useUser();
  if (user) {
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return props.children;
};

export default function AuthBasic() {
  return (
    <LayoutWrapper>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'github']}
        />
      </Container>
    </Auth.UserContextProvider>
    </LayoutWrapper>
  );
}
