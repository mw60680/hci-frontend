import React from 'react';
import { Formik, FormikState } from 'formik';
import { ORDER_COLLECTION_TYPE, ORDER_STATUS, PAYMENT_STATUS } from '../../../utils/constants';
import { Button, Stack, TextField, Typography } from '@mui/material';
import CollectionTypeSelection from '../../../components/orders/common/CollectionTypeSelection';
import PaymentStatusSelection from '../../../components/orders/common/PaymentStatusSelection';
import OrderStatusSelection from '../../../components/orders/common/OrderStatusSelection';
import { filterNonEmptyValues } from '../../../utils/helpers';

export type FiltersType = {
  collectionType: ORDER_COLLECTION_TYPE;
  clientId: string;
  patientName: string;
  patientMobile: string;
  patientEmail: string;
  paymentStatus: PAYMENT_STATUS;
  orderStatus: ORDER_STATUS;
  homeCollectionCity: string;
  campName: string;
};

const initialValues: FiltersType = {
  collectionType: ORDER_COLLECTION_TYPE.BLANK,
  clientId: '',
  patientName: '',
  patientMobile: '',
  patientEmail: '',
  paymentStatus: PAYMENT_STATUS.BLANK,
  orderStatus: ORDER_STATUS.BLANK,
  homeCollectionCity: '',
  campName: ''
};

type ComponentProps = {
  formValues: Partial<FiltersType>;
  setFormValues: (val: Partial<FiltersType>) => void;
};

const Filters: React.FC<ComponentProps> = ({ formValues, setFormValues }) => {
  const handleSubmit = (values: FormikState<FiltersType>['values']) => {
    setFormValues(filterNonEmptyValues(values));
  };

  const handleReset = () => {
    setFormValues({});
  };

  return (
    <Formik initialValues={{ ...initialValues, ...formValues }} onSubmit={handleSubmit} onReset={handleReset}>
      {({ values, handleChange, handleBlur, handleReset, handleSubmit }) => (
        <Stack gap='1em' paddingBottom='1em' component='form' onSubmit={handleSubmit} onReset={handleReset}>
          <Typography fontSize='1.125rem' fontWeight={700}>
            Filters
          </Typography>
          <Stack direction='row' gap='1em' flexWrap='wrap'>
            <CollectionTypeSelection name='collectionType' value={values.collectionType} handleChange={handleChange} />

            <TextField
              label='Patient Name'
              name='patientName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.patientName}
            />

            <TextField
              label='Patient Mobile'
              name='patientMobile'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.patientMobile}
            />

            <TextField
              label='Patient Email'
              name='patientEmail'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.patientEmail}
            />

            <PaymentStatusSelection
              name='paymentStatus'
              value={values.paymentStatus}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <OrderStatusSelection
              name='orderStatus'
              value={values.orderStatus}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <TextField
              label='Home Collection City'
              name='homeCollectionCity'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.homeCollectionCity}
            />

            <TextField
              label='Camp Name'
              name='campName'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.campName}
            />
          </Stack>

          <Stack direction='row' gap='1em' justifyContent='flex-end'>
            <Button type='reset' variant='outlined'>
              Reset Filters
            </Button>
            <Button type='submit' variant='contained'>
              Apply Filters
            </Button>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

export default Filters;
