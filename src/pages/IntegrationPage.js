import { Helmet } from "react-helmet-async";
import { useState, forwardRef, useEffect } from "react";
import { resetDashboard } from "../actions/dashboard";
import { connect } from "react-redux";
import {
  Grid,
  Dialog,
  AppBar,
  ListItemText,
  ListItem,
  List,
  DialogContentText,
  Toolbar,
  Button,
  Typography,
  Slide,
  IconButton,
  Link,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppIntegrationMatrix, IntegrationPopUpModel } from "../sections/@dashboard/app";
import SvgColor from "../components/svg-color";
import integrations from "../_mock/integrations";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const IntegrationPage = ({ resetDashboard }) => {
  useEffect(() => {
    resetDashboard();
  }, []);
  const [metrics, setMetrics] = useState(null);

  const [open, setOpen] = useState(false);
  const [openConnect, setOpenConnect] = useState(false);

  const handleClickOpen = (matric) => {
    setOpen(true);
    setMetrics(matric);
  };

  const handleClose = () => {
    setOpen(false);
    setMetrics(null);
  };

  const handleConnectButton = (matric) => {
    setOpenConnect(true);
    setMetrics(matric);
  };

  const handleCloseConnect = () => {
    setOpenConnect(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Dashboard App </title>
      </Helmet>

      <Typography variant='h4' sx={{ mb: 5 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "22.5px",
              color: "#000",
            }}>
            Integrations
          </span>
        </div>
      </Typography>

      {openConnect && (
        <Dialog open={openConnect} maxWidth={"350"} onClose={handleCloseConnect}>
          <div className='connect-box'>
            <SvgColor
              src={"/assets/icons/back.svg"}
              sx={{ width: 30, height: 30, margin: "15px 0px 0px 25px", cursor: "pointer" }}
              onClick={handleCloseConnect}
            />
            <div className='logo-header'>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={"/integration/" + metrics["title"] + ".png"} width={"30px"} height={"30px"} />
                <span className='title-connect'>{metrics["title"]}</span>
              </div>

              <div>
                <span className='sub-connect-title'>Select {metrics["title"]} Account</span>
              </div>

              <div style={{ margin: "50px 0px" }}>
                <Button className='button-connect'>
                  <span className='button-text'>Add New Account</span>
                </Button>
                <Typography style={{ lineHeight: "2.5" }}>
                  We take care of your data seriously, Our <Link>Privacy Policy</Link>
                </Typography>
                <Button className='next-button'>
                  <span className='button-text-next'>Next</span>
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {metrics && (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar sx={{ position: "relative", background: "#FF4D42", position: "sticky" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Toolbar>
                <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
                  <CloseIcon />
                </IconButton>
                <div style={{ display: "flex", border: "1px solid", padding: "20px", background: "white" }}>
                  <img src={"/integration/" + metrics["title"] + ".png"} width={"30px"} height={"30px"} />
                  <Typography sx={{ ml: 2, flex: 1, color: "black" }} variant='h6'>
                    {metrics["title"]}
                  </Typography>
                </div>
              </Toolbar>
              <div style={{ border: "1px solid", margin: "15px 15px 15px 0px" }}>
                <Button autoFocus color='inherit' onClick={() => handleConnectButton(metrics)}>
                  Connect Account
                </Button>
              </div>
            </div>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant='body2' className='top-five-text'>
                    Select up to 5 instant metrics at a time
                  </Typography>
                }
                secondary={
                  <Typography variant='body2' className='top-five-text-sub'>
                    You can select more metrics later by returning to this page.
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <DialogContentText>
                <IntegrationPopUpModel matrix={metrics} />
              </DialogContentText>
            </ListItem>
          </List>
        </Dialog>
      )}

      <Grid container spacing={2}>
        {integrations.map((matric) => (
          <Grid item md={4}>
            <Paper sx={{ py: 5, textAlign: "center" }} elevation={3}>
              <AppIntegrationMatrix matrix={matric} handleClickOpen={() => handleClickOpen(matric)} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_detail: state.auth.user,
  userList: state.user.userList,
  loadUser: state.user.loading,
});

export default connect(mapStateToProps, { resetDashboard })(IntegrationPage);
