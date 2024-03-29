import { getSession } from 'next-auth/client';

const HomePage = (props) => {
  return <p>index</p>;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  if (session) {
    return {
      redirect: {
        destination: '/scheduler',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default HomePage;
