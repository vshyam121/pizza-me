import HTGarlicButteryBlendPreview from '../images/crust_ht_GarlicButteryBlend.png';
import ThinGarlicButteryBlendPreview from '../images/crust_thin_GarlicButteryBlend.png';
import PanGarlicButteryBlendPreview from '../images/crust_pan_GarlicButteryBlend.png';
import GarlicButteryBlendIcon from '../images/icon_finisher_GarlicButteryBlend_whole_2017.png';
import HTToastedParmesanPreview from '../images/crust_ht_ToastedParmesan.png';
import ThinToastedParmesanPreview from '../images/crust_thin_ToastedParmesan.png';
import PanToastedParmesanPreview from '../images/crust_pan_ToastedParmesan.png';
import ToastedParmesanIcon from '../images/icon_finisher_ToastedParm_whole_2017.png';
import NoCrustFlavorIcon from '../images/icon_finisher_none_whole_2017.png';
import { HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN } from './crustMetadata';

/* All metadata related to the display of crust flavor options */

export const NO_CRUST_FLAVOR = 'No Crust Flavor';
export const GARLIC_BUTTERY_BLEND = 'Garlic Buttery Blend';
export const TOASTED_PARMESAN = 'Toasted Parmesan';

export const crust_flavors = [
  NO_CRUST_FLAVOR,
  GARLIC_BUTTERY_BLEND,
  TOASTED_PARMESAN,
];

export const crustFlavorImageMapping = {
  [NO_CRUST_FLAVOR]: {
    icon: NoCrustFlavorIcon,
  },
  [GARLIC_BUTTERY_BLEND]: {
    [HAND_TOSSED]: {
      preview: HTGarlicButteryBlendPreview,
    },
    [THIN_N_CRISPY]: {
      preview: ThinGarlicButteryBlendPreview,
    },
    [ORIGINAL_PAN]: {
      preview: PanGarlicButteryBlendPreview,
    },
    icon: GarlicButteryBlendIcon,
  },
  [TOASTED_PARMESAN]: {
    [HAND_TOSSED]: {
      preview: HTToastedParmesanPreview,
    },
    [THIN_N_CRISPY]: {
      preview: ThinToastedParmesanPreview,
    },
    [ORIGINAL_PAN]: {
      preview: PanToastedParmesanPreview,
    },
    icon: ToastedParmesanIcon,
  },
};
