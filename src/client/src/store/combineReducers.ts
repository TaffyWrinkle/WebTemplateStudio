import { combineReducers } from "redux";
import azureProfileData from "./azureProfileData/combineReducers";
import navigation from "./navigation/combineReducers";
import templates from "./templates/combineReducers";
import config from "./config/combineReducers";
import userSelection from "./userSelection/combineReducers";
import selection from "./selection/combineReducers";
import RootAction from "./ActionType";
import { CONFIG_TYPEKEYS } from "./typeKeys";

const appReducer = combineReducers({
  templates,
  config,
  userSelection,
  selection,
  azureProfileData,
  navigation
});

export type AppState = ReturnType<typeof appReducer>;

const rootReducer = (state: AppState | undefined, action: RootAction) => {
  let passedState: any;

  if (action.type === CONFIG_TYPEKEYS.RESET_WIZARD) {
    const { backendOptions, frontendOptions, pageOptions } = state!.templates;
    const { previewStatus, detailsPage, validations, isValidatingName, versions } = state!.config;

    passedState = {
      azureProfileData: state!.azureProfileData,
      navigation: {
        modals:undefined
      },
      userSelection: {
        projectNameObject:{
          projectName:"",
          validation:{
            isValid:true,
            error:"",
            isDirty:false
          }
        },
        frontendFramework:frontendOptions.filter((frame)=>frame.internalName==="React")[0],
        backendFramework:backendOptions.filter((frame)=>frame.internalName==="Node")[0]
      },
      template: { backendOptions, frontendOptions, pageOptions },
      config:{
        previewStatus,
        validations,
        detailsPage,
        isValidatingName,
        versions,
      },
      wizardRoutes: undefined,
    };


  } else {
    passedState = state;
  }
  return appReducer(passedState, action);
};

export default rootReducer;
