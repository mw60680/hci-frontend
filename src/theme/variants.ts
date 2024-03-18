import merge from 'deepmerge';
import { green, grey, indigo } from '@mui/material/colors';
import { THEMES } from '../constants';

const BLUE = {
  primary: '#25476A',
  secondary: '#03A9F4'
};

const WHITE = {
  absolute: '#FFF',
  light: '#F7F9FC'
};

const BLACK = {
  absolute: '#000',
  primary: '#191C24',
  secondary: '#233044'
};

const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    mode: 'light',
    primary: {
      main: BLUE.primary,
      contrastText: '#FFF'
    },
    secondary: {
      main: BLUE.secondary,
      contrastText: '#FFF'
    },
    background: {
      default: '#F7F9FC',
      paper: '#FFF'
    }
  },
  header: {
    color: grey[500],
    background: '#FFF',
    search: {
      color: grey[800]
    },
    indicator: {
      background: BLUE.primary
    }
  },
  footer: {
    color: grey[500],
    background: '#FFF'
  },
  sidebar: {
    color: grey[200],
    background: '#233044',
    header: {
      color: grey[200],
      background: '#233044',
      brand: {
        color: BLUE.primary
      }
    },
    footer: {
      color: grey[200],
      background: '#1E2A38',
      online: {
        background: green[500]
      }
    },
    badge: {
      color: '#FFF',
      background: BLUE.primary
    }
  }
};

const darkVariant = merge(defaultVariant, {
  name: THEMES.DARK,
  palette: {
    mode: 'dark',
    primary: {
      main: BLACK.primary,
      contrastText: WHITE.absolute
    },
    background: {
      default: BLACK.primary,
      paper: BLACK.secondary
    },
    text: {
      primary: WHITE.absolute,
      secondary: WHITE.light
    }
  },
  header: {
    color: grey[300],
    background: '#1B2635',
    search: {
      color: grey[200]
    }
  },
  footer: {
    color: grey[300],
    background: '#233044'
  }
});

const indigoVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: '#FFF'
    },
    secondary: {
      main: indigo[400],
      contrastText: '#FFF'
    }
  },
  header: {
    indicator: {
      background: indigo[600]
    }
  },
  sidebar: {
    color: '#FFF',
    background: indigo[700],
    header: {
      color: '#FFF',
      background: indigo[800],
      brand: {
        color: '#FFFFFF'
      }
    },
    footer: {
      color: '#FFF',
      background: indigo[800],
      online: {
        background: '#FFF'
      }
    },
    badge: {
      color: '#000',
      background: '#FFF'
    }
  }
});

const variants: Array<VariantType> = [
  defaultVariant,
  darkVariant,
  indigoVariant
];

export default variants;

export type VariantType = {
  name: string;
  palette: {
    primary: MainContrastTextType;
    secondary: MainContrastTextType;
  };
  header: ColorBgType & {
    search: {
      color: string;
    };
    indicator: {
      background: string;
    };
  };
  footer: ColorBgType;
  sidebar: ColorBgType & {
    header: ColorBgType & {
      brand: {
        color: string;
      };
    };
    footer: ColorBgType & {
      online: {
        background: string;
      };
    };
    badge: ColorBgType;
  };
};

type MainContrastTextType = {
  main: string;
  contrastText: string;
};
type ColorBgType = {
  color: string;
  background: string;
};
