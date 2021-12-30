import styled from 'styled-components';
import HeadBoy from '@components/HeadBoy';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

const InputDataSchema = Yup.object().shape({
  min_lat: Yup.number()
    .required('Minimum Latitude is required')
    .min(-90, 'Minimum Latitude must be between -90 and 90')
    .max(90, 'Minimum Latitude must be between -90 and 90'),
  min_lon: Yup.number()
    .required('Minimum Longitude is required')
    .min(-180, 'Minimum Longitude must be between -180 and 180')
    .max(180, 'Minimum Longitude must be between -180 and 180'),
  max_lat: Yup.number()
    .required('Maximum Latitude is required')
    .min(-90, 'Maximum Latitude must be between -90 and 90')
    .max(90, 'Maximum Latitude must be between -90 and 90'),
  max_lon: Yup.number()
    .required('Maximum Longitude is required')
    .min(-180, 'Maximum Longitude must be between -180 and 180')
    .max(180, 'Maximum Longitude must be between -180 and 180'),
});

type InputDataProps = {
  min_lat: string;
  min_lon: string;
  max_lat: string;
  max_lon: string;
};

const INITIAL_VALUES = {
  min_lat: '',
  min_lon: '',
  max_lat: '',
  max_lon: '',
};

type GeoProps = {
  id: string;
  name: string;
  description: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  long_name: string;
  from?: string;
  to?: string;
};

function Home() {
  const [geoData, setGeoData] = useState<GeoProps[]>([]);
  const getGeoJSON = async (values: InputDataProps) => {
    const { min_lat, min_lon, max_lat, max_lon } = values;
    try {
      const response = await axios.get('http://localhost:5000/api/geojson', {
        params: {
          coords: `${min_lon},${min_lat},${max_lon},${max_lat}`,
        },
      });

      const { data } = response;

      const geoDataMap = data.features.map((geoFeatures) => {
        const properties = geoFeatures.properties;
        const geometry = geoFeatures.geometry;

        return {
          id: properties.id,
          name: properties.name,
          description: properties.description,
          long_name: properties.long_name,
          from: properties.from,
          to: properties.to,
          geometry,
        } as GeoProps;
      });

      setGeoData(geoDataMap);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <HeadBoy title="Home" />
      <Wrapper>
        <section className="wrapper-inner">
          <Heading>OSM to GeoJSON</Heading>
          <FormCard>
            <section className="card-inner">
              <Formik
                validationSchema={InputDataSchema}
                initialValues={INITIAL_VALUES}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(true);
                  getGeoJSON(values)
                    .then(() => setSubmitting(false))
                    .catch(() => setSubmitting(false));
                }}
              >
                {({
                  errors,
                  handleChange,
                  handleSubmit,
                  touched,
                  values,
                  isSubmitting,
                }) => {
                  return (
                    <Form className="form">
                      <section className="input-wrapper">
                        <div className="form-group">
                          <InputBox
                            type="text"
                            placeholder="Minimum Longitude"
                            value={values.min_lon}
                            onChange={handleChange('min_lon')}
                          />
                          {touched.min_lon && errors.min_lon && (
                            <span className="input-error">
                              {errors.min_lon}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <InputBox
                            type="text"
                            placeholder="Minimum Latitude"
                            value={values.min_lat}
                            onChange={handleChange('min_lat')}
                          />
                          {touched.min_lat && errors.min_lat && (
                            <span className="input-error">
                              {errors.min_lat}
                            </span>
                          )}
                        </div>
                      </section>
                      <section className="input-wrapper">
                        <div className="form-group">
                          <InputBox
                            type="text"
                            placeholder="Maximum Longitude"
                            value={values.max_lon}
                            onChange={handleChange('max_lon')}
                          />
                          {touched.max_lon && errors.max_lon && (
                            <span className="input-error">
                              {errors.max_lon}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <InputBox
                            type="text"
                            placeholder="Maximum Latitude"
                            value={values.max_lat}
                            onChange={handleChange('max_lat')}
                          />
                          {touched.max_lat && errors.max_lat && (
                            <span className="input-error">
                              {errors.max_lat}
                            </span>
                          )}
                        </div>
                      </section>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </section>
          </FormCard>
          {geoData.length > 0 ? (
            geoData.map((geo) => (
              <AccordionCard key={geo.id}>
                <section className="card-inner">
                  <section className="content">
                    <section className="summary">
                      <h5 className="title">{geo.name}</h5>
                      <p className="description">
                        {geo.long_name || geo.description}
                      </p>
                      {geo.from && geo.to && (
                        <p className="direction">
                          {geo.from} <>&rarr;</> {geo.to}
                        </p>
                      )}
                    </section>
                  </section>
                </section>
              </AccordionCard>
            ))
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

const Card = styled.section`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;

  .card-inner {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
`;

const AccordionCard = styled(Card)`
  border-left: solid 5px ${({ theme }) => theme.colors.primary};

  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
      flex-direction: column;
    }
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
  }

  .title {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
    font-weight: 700;
  }

  .description {
    color: ${({ theme }) => theme.colors.black};
    font-size: 0.8rem;
    font-weight: 400;
  }

  .direction {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8rem;
    font-weight: 500;
    text-align: left;
    margin-top: 0.25rem;
  }
`;

const FormCard = styled(Card)`
  position: sticky;

  .form {
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
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .input-error {
    color: ${({ theme }) => theme.colors.danger};
    font-size: 0.75rem;
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

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 0.6rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: solid 1px transparent;
  outline: none;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};

    cursor: not-allowed;
  }
`;

export default Home;
