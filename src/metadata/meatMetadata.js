import PepperoniPreview from '../images/topping_Pepperoni_ML_reg.png';
import ExtraPepperoniPreview from '../images/topping_Pepperoni_ML_extra.png';
import PepperoniIcon from '../images/icon_topping_Pepperoni.png';
import ItalianSausagePreview from '../images/topping_ItalianSausage_ML_reg.png';
import ExtraItalianSausagePreview from '../images/topping_ItalianSausage_ML_extra.png';
import ItalianSausageIcon from '../images/icon_topping_ItalianSausage.png';
import HamPreview from '../images/topping_Ham_ML_reg.png';
import ExtraHamPreview from '../images/topping_Ham_ML_extra.png';
import HamIcon from '../images/icon_topping_Ham.png';
import BaconPreview from '../images/topping_Bacon_ML_reg.png';
import ExtraBaconPreview from '../images/topping_Bacon_ML_extra.png';
import BaconIcon from '../images/icon_topping_Bacon.png';
import GrilledChickenPreview from '../images/topping_Chicken_ML_reg.png';
import ExtraGrilledChickenPreview from '../images/topping_Chicken_ML_extra.png';
import GrilledChickenIcon from '../images/icon_topping_Chicken.png';
import BeefPreview from '../images/topping_Beef_ML_reg.png';
import ExtraBeefPreview from '../images/topping_Beef_ML_extra.png';
import BeefIcon from '../images/icon_topping_Beef.png';
import PorkPreview from '../images/topping_Pork_ML_reg.png';
import ExtraPorkPreview from '../images/topping_Pork_ML_extra.png';
import PorkIcon from '../images/icon_topping_Pork.png';

/* All metadata related to the display of meat options */

export const PEPPERONI = 'Pepperoni';
export const ITALIAN_SAUSAGE = 'Italian Sausage';
export const HAM = 'Ham';
export const BACON = 'Bacon';
export const GRILLED_CHICKEN = 'Grilled Chicken';
export const BEEF = 'Beef';
export const PORK = 'Pork';

export const meatImageMapping = {
  [PEPPERONI]: {
    preview: PepperoniPreview,
    previewExtra: ExtraPepperoniPreview,
    icon: PepperoniIcon,
  },
  [ITALIAN_SAUSAGE]: {
    preview: ItalianSausagePreview,
    previewExtra: ExtraItalianSausagePreview,
    icon: ItalianSausageIcon,
  },
  [HAM]: {
    preview: HamPreview,
    previewExtra: ExtraHamPreview,
    icon: HamIcon,
  },
  [BACON]: {
    preview: BaconPreview,
    previewExtra: ExtraBaconPreview,
    icon: BaconIcon,
  },
  [GRILLED_CHICKEN]: {
    preview: GrilledChickenPreview,
    previewExtra: ExtraGrilledChickenPreview,
    icon: GrilledChickenIcon,
  },
  [BEEF]: {
    preview: BeefPreview,
    previewExtra: ExtraBeefPreview,
    icon: BeefIcon,
  },
  [PORK]: {
    preview: PorkPreview,
    previewExtra: ExtraPorkPreview,
    icon: PorkIcon,
  },
};
