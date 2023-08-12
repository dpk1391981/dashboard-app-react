import SvgColor from "../../../components/svg-color";

import { Card, Box, Paper, Grid, Checkbox } from "@mui/material";
import { useState } from "react";
const MATRICS = [
  { name: "Content Engagement" },
  { name: "New Followers" },
  { name: "Page Check-Ins" },
  { name: "Page Consumptions" },
  { name: "Page Engaged Users" },
  { name: "Page Impressions" },
  { name: "Page Likes" },
  { name: "Page Negative Feedback" },
  { name: "Page Reach" },
  { name: "Page Reactions" },
  { name: "Page Total Actions" },
  { name: "Page Unlike" },
  { name: "Page Views" },
  { name: "Post Impressions" },
  { name: "Post Likes" },
];
export default function IntegrationPopUpModel({
  matrix,
  title,
  svgicon,
  subtitle,
  total,
  icon,
  customcolor = "",
  color = "primary",
  sx,
  ...other
}) {
  const [active, setActive] = useState({});
  const activeClass = (index) => {
    setActive((prevValues) => ({
      ...prevValues,
      [index]: Object.keys(prevValues).filter((i) => prevValues[i]).length < 5 && !prevValues[index],
    }));
  };

  return (
    <Card {...other}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 2, sm: 6, md: 12 }}>
        {MATRICS.map(({ name }, index) => (
          <Grid item>
            <Paper
              sx={{
                p: 4,
              }}>
              <Box
                className='metrics-box'
                onClick={() => activeClass(index)}
                style={active && active[index] ? { border: "1px solid red" } : {}}>
                <div style={{ display: "flex" }}>
                  <div className='img-box'>
                    <div className='img-circle'>
                      <img src={"/assets/icons/Group_301.svg"} />
                    </div>
                  </div>
                  <span className='content-text'>{name}</span>
                </div>
                <SvgColor
                  src={"/assets/icons/info.svg"}
                  sx={{ width: 30, height: 30, margin: "15px 15px 0px 0px", cursor: "pointer" }}
                  //   onClick={handleCloseConnect}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
