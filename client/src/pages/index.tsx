import styled from 'styled-components';
import HeadBoy from '@components/HeadBoy';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

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

function Home() {
  const [data, setData] = useState<InputDataProps>(INITIAL_VALUES);

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
                  console.log(JSON.stringify(values));
                }}
              >
                {({ errors, handleChange, handleSubmit, touched, values }) => {
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
                      <Button type="submit" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </section>
          </FormCard>
          <AccordionCard>
            <section className="card-inner">
              <section className="content">
                <section className="summary">
                  <h5 className="title">Weinpfad Kraichgau</h5>
                  <p className="description">
                    Odenwaldklub HW 9, Weinpfad Kraichgau: Wiesloch - Münzesheim
                    - Weingarten
                  </p>
                </section>
                <button className="view-more">View More</button>
              </section>
            </section>
          </AccordionCard>
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

  .view-more {
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0.25rem 0.75rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
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
`;

export default Home;
