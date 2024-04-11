import React from 'react';
import { Stack } from '@mui/material';
import { FormikHandlers, FormikState } from 'formik';
import HomeCollectionDetails, { HomeCollectionFields } from './HomeCollectionDetails';
import { CampFields } from './CampCollectionDetails';
import BasicInfo, { PatientInfo } from './BasicInfo';
import PaymentInfo, { PaymentType } from './PaymentInfo';

export type OrderFormFields = {
  collectionType?: string;
  patient: Partial<PatientInfo>;
  payment: Partial<PaymentType>;
  homeCollection?: Partial<HomeCollectionFields>;
  camp?: Partial<CampFields>;
};

type ComponentProps = {
  values: FormikState<OrderFormFields>['values'];
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const OrderForm: React.FC<ComponentProps> = ({ values, handleChange, handleBlur, setFieldValue }) => {
  return (
    <Stack gap='1em'>
      <BasicInfo values={values} setFieldValue={setFieldValue} handleBlur={handleBlur} handleChange={handleChange} />

      <PaymentInfo values={values} handleBlur={handleBlur} handleChange={handleChange} />

      {values.collectionType === 'HOME_COLLECTION' && (
        <HomeCollectionDetails
          values={values.homeCollection || {}}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}
    </Stack>
  );
};

export default OrderForm;
