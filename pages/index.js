export default function Home() {
  return null;
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/landing',
      permanent: true
    }
  };
}
