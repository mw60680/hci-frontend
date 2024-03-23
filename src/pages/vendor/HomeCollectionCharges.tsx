import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    city: Yup.string().required('City is required') ,
    charges : Yup.string().required('Charge is required')
});

interface HomeCollectionCharges {
    city:string,
    charges:string
}
const HomeCollectionCharges: React.FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    homeCollectionCharges: HomeCollectionCharges[];
    editHomeCollectionCharge : HomeCollectionCharges ;
    editHomeCollectionChargeIndex: number ;
    setEditHomeCollectionChargeIndex: React.Dispatch<React.SetStateAction<number>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Added setFieldValue
}> = ({ open, setOpen, homeCollectionCharges, setFieldValue, editHomeCollectionCharge, editHomeCollectionChargeIndex, setEditHomeCollectionChargeIndex }) => {
    return (
        <Dialog open={open} onClose={() => {setEditHomeCollectionChargeIndex(-1); setOpen(false)}}>
            <DialogTitle>Home Collection Charges</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        city : editHomeCollectionCharge?.city || '',
                        charges : editHomeCollectionCharge?.charges || ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (editHomeCollectionChargeIndex !== -1) {
                            homeCollectionCharges[editHomeCollectionChargeIndex] = values;
                            setFieldValue('homeCollectionCharges',homeCollectionCharges);
                        } else {
                            const updatedHomeCollectionCharges = [...homeCollectionCharges, values];
                            setFieldValue('homeCollectionCharges', updatedHomeCollectionCharges);
                        }
                        setEditHomeCollectionChargeIndex(-1);
                        setOpen(false);
                        resetForm();
                    }}>
                    {({ errors, touched, handleChange, values }) => (
                        <Form>
                            <TextField
                                fullWidth
                                variant='standard'
                                label='City'
                                name='city'
                                id='city'
                                value={values.city}
                                onChange={handleChange}
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                            />
                            <TextField
                                fullWidth
                                variant='standard'
                                label='Charges'
                                name='charges'
                                id='charges'
                                value={values.charges}
                                onChange={handleChange}
                                error={touched.charges && Boolean(errors.charges)}
                                helperText={touched.charges && errors.charges}
                            />
                            <DialogActions>
                                <Button onClick={() =>{setEditHomeCollectionChargeIndex(-1); setOpen(false)}}>Cancel</Button>
                                <Button type='submit'>{
                                    editHomeCollectionCharge ? 'Edit' : 'Add'
                                }</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default HomeCollectionCharges;
