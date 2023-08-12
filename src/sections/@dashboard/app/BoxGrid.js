import * as React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper, Typography, ButtonBase, Checkbox, Box } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function BoxGrid({ image }) {
  return (
    <Paper
      sx={{
        p: 4,
        margin: "auto",
        width: "100%",
      }}>
      <Box className='metrics-box'>
        <div style={{ display: "flex" }}>
          <div className='img-box'>
            <div className='img-circle'>
              <img src={image} />
            </div>
          </div>
          <span className='content-text'>Content Engagement</span>
          <div style={{ margin: "20px 0px 0px 100px" }}>
            {" "}
            <Checkbox />
          </div>
        </div>
      </Box>
    </Paper>
  );
}
