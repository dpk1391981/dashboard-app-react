// @mui
import PropTypes from "prop-types";
import { Box, Paper, Link, Stack, Card, CardContent, Divider, Typography, CardHeader, Button } from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
import Scrollbar from "../../../components/scrollbar";

import { Link as RouterLink, useNavigate } from "react-router-dom";

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppNewsUpdate({ title, viewLink, editLink, subheader, list, ...other }) {
  const navigate = useNavigate();
  const onClickHandlRoute = (link) => {
    navigate(link, { replace: true });
  };
  return (
    <Paper elevation={6}>
      <Card sx={{ maxWidth: 600 }} {...other}>
        <CardHeader title={<Typography variant='h6'>{title}</Typography>} subheader={subheader} />

        <CardContent>
          <Scrollbar>
            <Stack spacing={3} sx={{ p: 3, pr: 0 }}></Stack>
          </Scrollbar>

          <Divider />

          <Box sx={{ p: 2, textAlign: "right", display: "flex", justifyContent: "space-between" }}>
            <Button variant='contained' color='inherit' onClick={() => onClickHandlRoute(editLink)}>
              Edit
            </Button>
            <Button variant='contained' color='inherit' onClick={() => onClickHandlRoute(viewLink)}>
              View
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Paper>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ news }) {
  const { image, title, description, postedAt } = news;

  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <Box component='img' alt={title} src={image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color='inherit' variant='subtitle2' underline='hover' noWrap>
          {title}
        </Link>

        <Typography variant='body2' sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography variant='caption' sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}>
        {fToNow(postedAt)}
      </Typography>
    </Stack>
  );
}
