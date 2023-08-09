// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';

// utils
import { useTheme, styled } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';

import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

AppWidgetEarnings.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppWidgetEarnings({
  title,
  totalEarnings = 0,
  subheader,
  list,
  component,
  chartColors,
  chartData,
  ...other
}) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'left' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...other}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#B6B6B6' }} color="text.secondary">
          {subheader}
        </Typography>

        <Typography sx={{ fontSize: 30, fontWeight: 700, margin: '10px 0px 0px 0px' }} component="div">
          ${fShortenNumber(totalEarnings)}
        </Typography>

        <Typography sx={{ fontSize: 14, color: '#B6B6B6' }} color="text.secondary">
          Profit is 48% More than last Month
        </Typography>
        <StyledChartWrapper dir="ltr">
          <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} />
        </StyledChartWrapper>

        {/* <Typography variant="h3">${fShortenNumber(totalEarnings)}</Typography> */}
        {/* <Typography variant="h6">${fShortenNumber(totalEarnings)}</Typography> */}
        {/* </Box> */}
      </CardContent>
    </Card>
  );
}
