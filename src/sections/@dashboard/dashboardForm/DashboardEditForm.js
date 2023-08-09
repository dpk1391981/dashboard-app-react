import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, change, reduxForm, reset, initialize } from "redux-form";
import ColorPicker from "react-color";
import { useNavigate } from "react-router-dom";
import {
  LinearProgress,
  FormGroup,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  Grid,
  Checkbox,
  Box,
} from "@mui/material";
import RenderTextField from "./Form-helper/RenderTextField";
import RenderColorInput from "./Form-helper/RenderColorInput";
import RenderSwitch from "../../form-helper/RenderSwitch";
import { UpdateDashboard } from "../../../actions/dashboard";
import validation from "./validation";

const commonCheckBoxColor = {
  "&.Mui-checked": {
    color: "#FF4D42",
  },
};

const DashboardEditForm = ({
  loadingWidgets,
  handleSubmit,
  submitting,
  dispatch,
  form,
  widgets,
  UpdateDashboard,
  user,
  dashboard_detail,
}) => {
  const navigate = useNavigate();
  const formValue = form || {};
  const isCustomColor = formValue && formValue["custom_color"] ? true : false;

  useEffect(() => {
    dispatch(
      initialize("DashboardEditForm", {
        title: dashboard_detail ? dashboard_detail["title"] : "",
        custom_color: dashboard_detail && dashboard_detail["color"]["primary"] ? true : false,
        color_code: dashboard_detail ? dashboard_detail["color"]["primary"] : "",
      }),
    );
  }, [dashboard_detail]);
  const [selectedColor, setSelectedColor] = useState("#000000"); // Initial color is black

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [backgourdCheck, setBackGroundColor] = useState({
    dashboard_background: true,
  });

  const [widgetCheck, setWidgetCheck] = useState({
    "64cf613b092be9b23f481aa3": true,
    "64cf6647092be9b23f481aa4": true,
    "64cf6688092be9b23f481aa6": true,
    "64cf6678092be9b23f481aa5": true,
  });

  const handleColorChange = (color) => {
    let colorCode = null;
    if (isCustomColor) {
      colorCode = color;
    }
    setSelectedColor(color.hex);
    dispatch(change("DashboardEditForm", "color_code", colorCode["hex"]));
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prevState) => !prevState);
  };

  const handleWidgetCheckBox = (event) => {
    const { name, checked } = event.target;
    setWidgetCheck((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleBackgroundCheck = (event) => {
    const { name, checked } = event.target;
    setBackGroundColor((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const resetForm = () => {
    dispatch(reset("DashboardEditForm"));
  };

  const onSubmit = async (data) => {
    var keys = Object.keys(widgetCheck);
    var filteredWidgets = keys.filter(function (key) {
      return widgetCheck[key];
    });

    const payload = {
      title: data["title"],
      color: {
        primary: isCustomColor ? data["color_code"] : null,
      },
      widgets: filteredWidgets,
      _id: dashboard_detail["_id"],
    };

    console.log(`payloadpayload`);
    console.log(payload);
    const updateForm = await UpdateDashboard(payload, user["_id"]);
    console.log(`updateFormupdateFormupdateForm`);
    console.log(updateForm);
    if (updateForm) {
      resetForm();
      navigate("/dashboard/view/" + updateForm["data"]["_id"], { replace: true });
    }
  };

  const handleSwitchClick = () => {
    if (!isCustomColor) {
      dispatch(change("DashboardEditForm", "color_code", null));
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 30 }}>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant='h4' sx={{ mb: 5 }}>
                <div className='create-new-dashboard'>
                  Edit Dashboard <span className='edit-mode'>Edit Mode</span>
                </div>

                <Typography className='heading1' variant='span' sx={{ mb: 5, color: "#333" }}>
                  Enter the code that we sent you to at your email
                </Typography>
              </Typography>
              <div className='left-text-container'>
                <Typography className='custom-heading' variant='span' sx={{ mb: 5 }}>
                  Custom Name Dashboard
                </Typography>
                <Field name='title' placeholder='Enter your dashboard name' component={RenderTextField} />

                <Typography className='matrix-info'>This dashboard needs some metrics:</Typography>
                <div className='create-dashbord-default-div'>
                  <img src='/images/dashboard-create.png' />
                </div>
                <Button className='insert-metrics'>
                  <span className='insert-metrics-txt'>Insert Metrics</span>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item>
              <div className='right-btn'>
                <Button className='btn-ai'>
                  <span className='btn-ai-text'>Creating a Dashboard with AI Screen</span>
                </Button>
                <div className='btn-save'>
                  <Button className='save-text' type='submit' disabled={submitting}>
                    Save Dashboard
                  </Button>
                </div>
              </div>
              <div className='color-section'>
                <div className='color-txt'>Colors</div>
                <span className='color-txt-p'>Use custom dashboard colors</span>
                <span>
                  <Field
                    name='custom_color'
                    component={RenderSwitch}
                    isCustomColor={isCustomColor}
                    handleClick={handleSwitchClick}
                  />
                </span>
              </div>

              {isCustomColor && (
                <>
                  <FormControl sx={{ m: 1, width: "25ch" }} variant='standard'>
                    <Field
                      name='color_code'
                      placeholder='Enter color code'
                      handleClick={toggleColorPicker}
                      component={RenderColorInput}
                    />
                    <div className='color-box'>
                      {showColorPicker && (
                        <ColorPicker
                          color={selectedColor}
                          onChange={handleColorChange}
                          onClose={() => setShowColorPicker(false)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormGroup className='check-box-form'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={commonCheckBoxColor}
                          type='checkbox'
                          name='dashboard_background'
                          checked={backgourdCheck.dashboard_background}
                          onChange={handleBackgroundCheck}
                        />
                      }
                      label='Dashboard Background'
                    />
                  </FormGroup>
                </>
              )}
              <div className='widget-container'>
                <div className='widget-text'>
                  <span>Widgets</span>
                </div>

                <FormGroup className='widget-checkbox-container'>
                  {loadingWidgets ? (
                    <LinearProgress />
                  ) : (
                    <>
                      {widgets &&
                        widgets.map((widget) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                sx={commonCheckBoxColor}
                                type='checkbox'
                                name={widget["_id"]}
                                checked={widgetCheck[widget["_id"]]}
                                onChange={handleWidgetCheckBox}
                              />
                            }
                            label={widget["title"]}
                          />
                        ))}
                    </>
                  )}
                </FormGroup>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  form: state.form.DashboardEditForm ? state.form.DashboardEditForm.values : {},
  widgets: state.widget.widgets,
  loadingWidgets: state.widget.loading,
  user: state.auth.user,
  dashboard_detail: state.dashboard.dashboard_detail,
});
export default reduxForm({
  form: "DashboardEditForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validation,
})(connect(mapStateToProps, { UpdateDashboard })(DashboardEditForm));
