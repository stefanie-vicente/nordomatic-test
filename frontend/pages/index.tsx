export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/buildings",
      permanent: true,
    },
  };
}

export default function Home() {
  return null;
}
