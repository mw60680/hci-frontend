import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetailsQuery, useUpdateOrderMutation } from '../../../api/orders';
import ContentWrapper from '../../../components/ContentWrapper';
import { Formik, FormikHelpers, FormikState } from 'formik';
import { Alert, Button, Stack, Typography } from '@mui/material';
import OrderForm, { OrderFormFields } from '../../../components/orders/OrderForm';
import { mapOrderDetailResponseToForm } from './util';
import { ICreateOrderRequest } from '../../../api/types/request/orders';
import moment from 'moment';

const EditOrder = () => {
  const { uuid } = useParams();

  const [error, setError] = useState('');

  const { data: orderData, isLoading } = useOrderDetailsQuery({ uuid: uuid! }, { skip: !uuid });

  const [updateOrder] = useUpdateOrderMutation();

  if (isLoading) return <div>Loading...</div>;

  const handleSave = async (
    values: FormikState<OrderFormFields>['values'],
    helpers: FormikHelpers<OrderFormFields>
  ) => {
    try {
      helpers.setSubmitting(true);

      const body: ICreateOrderRequest = {
        collectionType: values.collectionType!,
        orderStatus: 'CREATED'
      };

      if (values.patient) {
        body.patient = {
          name: values.patient.name,
          dob: values.patient.dob ? moment(new Date(values.patient.dob)).format('YYYY-MM-DD') : '',
          email: values.patient.email,
          gender: values.patient.gender,
          mobile: values.patient.mobile
        };
      }

      if (values.payment) {
        body.payment = {
          amount: values.payment.amount,
          mode: values.payment.mode,
          paid: values.payment.paid,
          status: values.payment.status,
          transactionId: values.payment.transactionId
        };
      }

      if (values.collectionType === 'HOME_COLLECTION' && values.homeCollection) {
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

      if (values.collectionType === 'CAMP' && values.camp) {
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

      const res = await updateOrder({ uuid: uuid!, body });

      console.debug(res);

      if ('error' in res) throw res.error;
    } catch (err: any) {
      setError('Error updating order');
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <ContentWrapper>
      <Formik initialValues={mapOrderDetailResponseToForm(orderData!)} onSubmit={handleSave}>
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, isSubmitting }) => (
          <Stack gap='1em' component='form' onSubmit={handleSubmit}>
            {error && <Alert severity='error'>{error}</Alert>}
            <Stack direction='row' justifyContent='space-between'>
              <Typography fontSize='1.25rem' fontWeight={700}>
                Edit Order
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

export default EditOrder;
