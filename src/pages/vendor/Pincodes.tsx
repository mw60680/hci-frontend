import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    supported_pincode: Yup.string().required('Pincode is required').matches(/^\d{6}$/, 'Pincode must be 6 digits')
});

const Pincodes: React.FC<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    supported_pincodes: string[];
    editSupportedPincode: string ;
    editSupportedPincodeIndex: number ;
    setEditSupportedPincodeIndex: React.Dispatch<React.SetStateAction<number>>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void; // Added setFieldValue
}> = ({ open, setOpen, supported_pincodes, setFieldValue, editSupportedPincode, editSupportedPincodeIndex, setEditSupportedPincodeIndex }) => {
    console.log(editSupportedPincodeIndex);
    return (
        <Dialog open={open} onClose={() =>{ setEditSupportedPincodeIndex(-1); setOpen(false)}}>
            <DialogTitle>Pincode</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        supported_pincode: editSupportedPincode || ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        if (editSupportedPincodeIndex !== -1) {
                            supported_pincodes[editSupportedPincodeIndex] = values.supported_pincode;
                            setFieldValue('supportedPincodes', supported_pincodes);
                        } else {
                            const updatedSupportedPincode = [...supported_pincodes, values.supported_pincode];
                            setFieldValue('supportedPincodes', updatedSupportedPincode);
                        }
                        setEditSupportedPincodeIndex(-1);
                        setOpen(false);
                        resetForm();
                    }}>
                    {({ errors, touched, handleChange, values }) => (
                        <Form>
                            <TextField
                                fullWidth
                                variant='standard'
                                label='Supported_Pincode'
                                name='supported_pincode'
                                id='supported_pincode'
                                value={values.supported_pincode}
                                onChange={handleChange}
                                error={touched.supported_pincode && Boolean(errors.supported_pincode)}
                                helperText={touched.supported_pincode && errors.supported_pincode}
                            />
                            <DialogActions>
                                <Button onClick={() => {setEditSupportedPincodeIndex(-1); setOpen(false)}}>Cancel</Button>
                                <Button type='submit'>{
                                    editSupportedPincode ? 'Edit' : 'Add'
                                }</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default Pincodes;
