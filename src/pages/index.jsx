import { Auth, Typography, Button } from '@supabase/ui';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

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
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'facebook', 'github']}
        />
      </Container>
    </Auth.UserContextProvider>
  );
}
