import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputDataProps, GeoProps } from '../types';
import axios from 'axios';
import { Card, InputBox, Button } from './StyledComponents';
import { __BASE_URL__ } from '@src/constants';
import { Notyf } from 'notyf';
import { useState, useEffect } from 'react';

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

const INITIAL_VALUES = {
  min_lat: '',
  min_lon: '',
  max_lat: '',
  max_lon: '',
};

type Props = {
  setGeoData: React.Dispatch<React.SetStateAction<GeoProps[]>>;
};

function CardForm({ setGeoData }: Props) {
  const [notyf, setNotyf] = useState<Notyf>();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setNotyf(new Notyf());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getGeoJSON = async (values: InputDataProps) => {
    const { min_lat, min_lon, max_lat, max_lon } = values;
    try {
      const response = await axios.get(`${__BASE_URL__}/api/geojson`, {
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
      notyf?.error(error?.response?.data?.error || 'Something went wrong');
    }
  };
  return (
    <FormCardWrapper>
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
                      <span className="input-error">{errors.min_lon}</span>
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
                      <span className="input-error">{errors.min_lat}</span>
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
                      <span className="input-error">{errors.max_lon}</span>
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
                      <span className="input-error">{errors.max_lat}</span>
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
    </FormCardWrapper>
  );
}

const FormCardWrapper = styled(Card)`
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

export default CardForm;
