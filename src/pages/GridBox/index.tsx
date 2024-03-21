import { Grid, Typography } from "@mui/material";
import React from "react";

const GridBox: React.FC<{ title: string, value: any }> = ({ title, value }) => {
    return (
        <React.Fragment>
            <Grid item xs={12} md={4}>
                <Typography variant={'h4'} component={'h6'} sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant={'h4'} component={'h6'}>
                    {String(value)}
                </Typography>
            </Grid>
        </React.Fragment>
    );
};
export default GridBox;