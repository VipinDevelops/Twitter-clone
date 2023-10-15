import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from '@/components/auth-button.server';
const Home = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: tweets } = await supabase.from('tweets').select();

  return (
    <>
      <AuthButtonServer />
      <pre> {JSON.stringify(tweets, null, 2)}</pre>
    </>
  );
};

export default Home;
