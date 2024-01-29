import { createTheme } from '@mui/material';

/* 
  Remember when adding/changing any colors or color names to make sure global.css matches with this
*/

export enum ColorPalette {
  LightPurple = '#E4D9FF',
  DarkBlue = '#273469',
  DarkerBlue = '#242562',
  DarkBlack = '#30343F',
  IceLight = '#FAFAFF',
  LightNightBlue = '#3D37F1',
}

// Module augmentation to make sure our custom colors types are available for MaterialUI components
declare module '@mui/material/styles' {
  interface PaletteColor {
    backgroundColorLightPurple: string;
    primaryColorDarkBlue: string;
    primaryColorDarkerBlue: string;
    secondaryColorDarkBlack: string;
    thirdColorIceLight: string;
    LightNightBlue: string;
  }

  interface SimplePaletteColorOptions {
    backgroundColorLightPurple: string;
    primaryColorDarkBlue: string;
    primaryColorDarkerBlue: string;
    secondaryColorDarkBlack: string;
    thirdColorIceLight: string;
    LightNightBlue: string;
  }
}

const theme = createTheme({
  typography: {},
  palette: {
    primary: {
      main: ColorPalette.DarkBlue,
      backgroundColorLightPurple: ColorPalette.LightPurple,
      primaryColorDarkBlue: ColorPalette.DarkBlue,
      primaryColorDarkerBlue: ColorPalette.DarkerBlue,
      secondaryColorDarkBlack: ColorPalette.DarkBlack,
      thirdColorIceLight: ColorPalette.IceLight,
      LightNightBlue: ColorPalette.LightNightBlue,
    },
  },
});

export default theme;
