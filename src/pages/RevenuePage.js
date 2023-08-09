import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
  AppWidgetEarnings,
} from '../sections/@dashboard/app';

export default function RevenuePage() {
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
            Today’s Revenue
          </span>
          <span
            style={{
              fontSize: '15px',
              color: '#B6B6B6',
            }}
          >
            Revenue Summary
          </span>
        </div>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Sales"
            total={5000}
            svgicon={'/assets/icons/icon.svg'}
            customcolor="#FF4842"
            subtitle="+10% from yesterday"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Orders"
            total={500}
            color="primary"
            customcolor="#FFC107"
            svgicon={'/assets/icons/icon1.svg'}
            subtitle="+8% from yesterday"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={9}
            color="error"
            customcolor="#2065D1"
            svgicon={'/assets/icons/vector.svg'}
            subtitle="+2% from yesterday"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Customers"
            total={12}
            color="warning"
            customcolor="#1890FF"
            svgicon={'/assets/icons/group.svg'}
            subtitle="+3% from yesterday"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Campaigns"
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
            chartData={[
              { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
              { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
              { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
            ]}
            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Visitor Insights"
            //   subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ]}
            chartData={[
              {
                name: 'Visitor 1',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Visitor 2',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Visitor 3',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AppWidgetEarnings
            title="Earnings"
            totalEarnings={6078.76}
            subheader={`Total Expense`}
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.warning.main,
              theme.palette.error.main,
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
