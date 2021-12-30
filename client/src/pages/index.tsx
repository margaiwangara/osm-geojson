import CardData from '@components/CardData';
import CardForm from '@components/CardForm';
import HeadBoy from '@components/HeadBoy';
import { GeoProps } from '@src/types';
import { useState } from 'react';
import styled from 'styled-components';

function Home() {
  const [geoData, setGeoData] = useState<GeoProps[]>([]);

  return (
    <>
      <HeadBoy title="Home" />
      <Wrapper>
        <section className="wrapper-inner">
          <Heading>OSM to GeoJSON</Heading>
          <CardForm setGeoData={setGeoData} />
          {geoData.length > 0 ? (
            geoData.map((geo) => <CardData geo={geo} key={geo.id} />)
          ) : (
            <EmptyBox>
              <p>There is no data to display</p>
            </EmptyBox>
          )}
        </section>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 1rem;

  .wrapper-inner {
    width: 50%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      width: 80%;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      width: 100%;
      padding: 0;
    }
  }
`;

const EmptyBox = styled.section`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;
const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export default Home;
