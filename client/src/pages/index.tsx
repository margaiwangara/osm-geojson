import styled from 'styled-components';
import HeadBoy from '@components/HeadBoy';

function Home() {
  return (
    <>
      <HeadBoy title="Home" />
      <Wrapper>
        <section className="wrapper-inner">
          <Heading>OSM to GeoJSON</Heading>
          <FormCard>
            <section className="card-inner">
              <section className="input-wrapper">
                <div className="form-group">
                  <InputBox type="text" placeholder="Minimum Longitude" />
                </div>
                <div className="form-group">
                  <InputBox type="text" placeholder="Minimum Latitude" />
                </div>
              </section>
              <section className="input-wrapper">
                <div className="form-group">
                  <InputBox type="text" placeholder="Maximum Longitude" />
                </div>
                <div className="form-group">
                  <InputBox type="text" placeholder="Maximum Latitude" />
                </div>
              </section>
            </section>
          </FormCard>
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
    }
  }
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const FormCard = styled.section`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  position: sticky;

  .card-inner {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-wrapper {
    display: flex;
    gap: 0.5rem;
  }

  .form-group {
    flex: 1;
  }
`;

const InputBox = styled.input`
  padding: 0.75rem 0.5rem;
  border: solid 1px transparent;
  outline: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.black};
  font-size: 0.9rem;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Home;
