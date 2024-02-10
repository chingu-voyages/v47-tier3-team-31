import { createTheme } from '@mui/material';

/* 
  Remember when adding/changing any colors or color names to make sure global.css matches with this
*/

enum ColorPalette {
  LightPurple = '#E4D9FF',
  DarkBlue = '#273469',
  DarkerBlue = '#242562',
  DarkBlack = '#30343F',
  IceLight = '#FAFAFF',
  LightNightBlue = '#3D37F1',
  LightBlack = '#424755',
  Charcoal = '#272727',
  LightIndigo = '#636EA9',
  GreyDisabled = '#8b93a7',
  NavyBlue = '#1D275F',
  GreenConfirmation = '#64aa76',
  BurntOrangeCancelError = '#aa6464',
}

// Module augmentation to make sure our custom colors types are available for MaterialUI components
declare module '@mui/material/styles' {
  interface PaletteColor {
    backgroundColorLightPurple: string;
    primaryColorDarkBlue: string;
    primaryColorDarkerBlue: string;
    secondaryColorDarkBlack: string;
    thirdColorIceLight: string;
    lightNightBlue: string;
    thirdColorlightBlack: string;
    charcoal: string;
    lightIndigo: string;
    greyDisabled: string;
    navyBlue: string;
    greenConfirmation: string;
    burntOrangeCancelError: string;
  }

  interface SimplePaletteColorOptions extends PaletteColor {}
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
      lightNightBlue: ColorPalette.LightNightBlue,
      thirdColorlightBlack: ColorPalette.LightBlack,
      charcoal: ColorPalette.Charcoal,
      lightIndigo: ColorPalette.LightIndigo,
      greyDisabled: ColorPalette.GreyDisabled,
      navyBlue: ColorPalette.NavyBlue,
      greenConfirmation: ColorPalette.GreenConfirmation,
      burntOrangeCancelError: ColorPalette.BurntOrangeCancelError,
    },
  },
});

export default theme;
