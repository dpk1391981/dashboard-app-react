import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import integrations from '../_mock/integrations';
import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

import { AppIntegrationMatrix } from '../sections/@dashboard/app';

export default function IntegrationPage() {
  const theme = useTheme();
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Dashboard App </title>
      </Helmet>

      <Typography variant="h4" sx={{ mb: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: '22.5px',
              color: '#000',
            }}
          >
            Integrations
          </span>
        </div>
      </Typography>

      <Grid container spacing={2}>
        {integrations.map((matric) => (
          <Grid item md={4}>
            <AppIntegrationMatrix matrix={matric} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
