import Head from 'next/head';

type Props = {
  title: string;
};

const HeadBoy = ({ title }: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>OSM to GeoJSON{title ? ` | ${title}` : 'Home'}</title>
    </Head>
  );
};

export default HeadBoy;
