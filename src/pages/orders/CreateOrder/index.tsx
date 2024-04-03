import React, { useState } from 'react';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { Formik, FormikHelpers, FormikState } from 'formik';
import ContentWrapper from '../../../components/ContentWrapper';
import OrderForm, { OrderFormFields } from '../../../components/orders/OrderForm';
import { ICreateOrderRequest } from '../../../api/types/request/orders';
import { useCreateOrderMutation } from '../../../api/orders';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const initialValues = {
  collectionType: 'HOME_COLLECTION',
  patient: {
    name: '',
    gender: '',
    dob: '',
    mobile: '',
    email: ''
  },
  payment: {
    status: '',
    mode: '',
    transactionId: '',
    amount: '',
    paid: ''
  },
  homeCollection: {},
  camp: {}
};

const CreateOrder = () => {
  const [error, setError] = useState('');

  const [createOrder] = useCreateOrderMutation();

  const navigate = useNavigate();

  const handleOrderCreation = async (
    values: FormikState<OrderFormFields>['values'],
    helpers: FormikHelpers<OrderFormFields>
  ) => {
    console.log(values);
    try {
      helpers.setSubmitting(true);

      const body: ICreateOrderRequest = {
        collectionType: values.collectionType,
        orderStatus: 'CREATED',
        patient: {
          name: values.patient.name,
          dob: values.patient.dob ? moment(new Date(values.patient.dob)).format('YYYY-MM-DD') : '',
          email: values.patient.email,
          gender: values.patient.gender,
          mobile: values.patient.mobile
        },
        payment: {
          amount: values.payment.amount,
          mode: values.payment.mode,
          paid: values.payment.paid,
          status: values.payment.status,
          transactionId: values.payment.transactionId
        }
      };

      if (values.collectionType === 'HOME_COLLECTION' && 'homeCollection' in values) {
        body.homeCollection = {
          address: values.homeCollection.address,
          locality: values.homeCollection.locality,
          city: values.homeCollection.city,
          pincode: values.homeCollection.pincode,
          lat: values.homeCollection.lat,
          lng: values.homeCollection.lng,
          alternateMobile: values.homeCollection.alternateMobile,
          scheduledTime: values.homeCollection.scheduledTime,
          sampleProcessingLab: values.homeCollection.sampleProcessingLab,
          phleboId: values.homeCollection.phleboId,
          phleboNotes: values.homeCollection.phleboNotes,
          runnerId: values.homeCollection.runnerId,
          tubeType: values.homeCollection.tubeType,
          barCode: values.homeCollection.barCode
        };
      }

      if (values.collectionType === 'CAMP' && 'camp' in values) {
        const camp: Partial<ICreateOrderRequest['camp']> = {
          address: values.camp.address,
          name: values.camp.name,
          time: values.camp.time
        };

        if ('manager' in values.camp) {
          camp.manager = {
            name: values.camp.manager?.name || '',
            mobile: values.camp.manager?.mobile || ''
          };
        }
        body.camp = camp;
      }

      const res = await createOrder({ body });

      console.debug(res);

      if ('error' in res) throw res.error;

      console.debug('navigate to orders');

      navigate('/orders');
    } catch (err: any) {
      console.error(err);
      setError('Error creating order');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ContentWrapper>
      <Formik initialValues={initialValues} onSubmit={handleOrderCreation}>
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, isSubmitting }) => (
          <Stack gap='1em' component='form' onSubmit={handleSubmit}>
            {error && <Alert severity='error'>{error}</Alert>}
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontSize='1.25rem' fontWeight={700}>
                Create Order
              </Typography>

              <Button type='submit' variant='contained' disabled={isSubmitting}>
                Save
              </Button>
            </Stack>
            <OrderForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}
            />
          </Stack>
        )}
      </Formik>
    </ContentWrapper>
  );
};

export default CreateOrder;
