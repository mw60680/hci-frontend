import React from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { FormikHandlers, FormikState } from 'formik';
import HomeCollectionDetails, { HomeCollectionFields } from './HomeCollectionDetails';
import CampCollectionDetails, { CampFields } from './CampCollectionDetails';
import BasicInfo, { PatientInfo } from './BasicInfo';
import PaymentInfo, { PaymentType } from './PaymentInfo';

export type OrderFormFields = {
  collectionType?: string;
  patient: Partial<PatientInfo>;
  payment: Partial<PaymentType>;
  homeCollection?: Partial<HomeCollectionFields>;
  camp?: Partial<CampFields>;
  remarks?: string;
  oldRemarks?: string[];
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

      {values.collectionType === 'CAMP' && (
        <CampCollectionDetails
          values={values.camp || {}}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
      )}

      <TextField
        name='remarks'
        value={values.remarks}
        placeholder='Remarks'
        label='Remarks'
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {values?.oldRemarks?.length ? (
        <Stack gap='0.5em' padding='1em' border='1px solid #333' borderRadius='1rem' bgcolor='#ddd'>
          <Typography fontWeight={700} fontSize='0.75rem'>
            Old Remarks
          </Typography>
          {values?.oldRemarks.map((remark, index) => <Typography key={`order-remark-${index}`}>{remark}</Typography>)}
        </Stack>
      ) : null}
    </Stack>
  );
};

export default OrderForm;
