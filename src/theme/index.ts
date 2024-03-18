import '@mui/lab/themeAugmentation';

import { createTheme as createMuiTheme } from '@mui/material/styles';
import variants from './variants';
import typography from './typography';
import breakpoints from './breakpoints';
import components from './components';
import shadows from './shadows';
import { Theme } from '@emotion/react';

const getSelectedTheme = (name: Theme) => {
  const showThemePalette = process.env.REACT_APP_ENABLE_THEME_PALETTE === 'true';

  if (!showThemePalette) return variants[0];

  let themeConfig = variants.find((variant) => variant.name === name);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${name} is not valid`));
    themeConfig = variants[0];
  }

  return themeConfig;
};

const createTheme = (name: Theme) => {
  const themeConfig = getSelectedTheme(name);

  return createMuiTheme(
    {
      spacing: 4,
      breakpoints: breakpoints,
      components: components,
      typography: typography,
      shadows: shadows,
      palette: themeConfig.palette
    },
    {
      name: themeConfig.name,
      header: themeConfig.header,
      footer: themeConfig.footer,
      sidebar: themeConfig.sidebar
    }
  );
};

export default createTheme;
