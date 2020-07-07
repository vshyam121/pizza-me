import HandTossedPreview from '../assets/images/crust_ht_NoFinish.png';
import HandTossedIcon from '../assets/images/icon_crust_ht.png';
import ThinNCrispyPreview from '../assets/images/crust_thin_NoFinish.png';
import ThinNCrispyIcon from '../assets/images/icon_crust_thin.png';
import OriginalPanPreview from '../assets/images/crust_pan_NoFinish.png';
import OriginalPanIcon from '../assets/images/icon_crust_pan.png';

/* All metadata related to the display of crust options */

export const HAND_TOSSED = 'Hand Tossed';
export const THIN_N_CRISPY = "Thin 'N Crispy";
export const ORIGINAL_PAN = 'Original Pan';

export const crustTypes = [HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN];

export const crustMetadataMapping = {
  [HAND_TOSSED]: {
    preview: HandTossedPreview,
    icon: HandTossedIcon,
  },
  [THIN_N_CRISPY]: {
    preview: ThinNCrispyPreview,
    icon: ThinNCrispyIcon,
  },
  [ORIGINAL_PAN]: {
    preview: OriginalPanPreview,
    icon: OriginalPanIcon,
    additionalDisplay: '+$2.00',
  },
};
