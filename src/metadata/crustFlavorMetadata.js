import HTGarlicButteryBlendPreview from "../assets/images/crust_ht_GarlicButteryBlend.webp";
import ThinGarlicButteryBlendPreview from "../assets/images/crust_thin_GarlicButteryBlend.webp";
import PanGarlicButteryBlendPreview from "../assets/images/crust_pan_GarlicButteryBlend.webp";
import GarlicButteryBlendIcon from "../assets/images/icon_finisher_GarlicButteryBlend_whole_2017.webp";
import HTToastedParmesanPreview from "../assets/images/crust_ht_ToastedParmesan.webp";
import ThinToastedParmesanPreview from "../assets/images/crust_thin_ToastedParmesan.webp";
import PanToastedParmesanPreview from "../assets/images/crust_pan_ToastedParmesan.webp";
import ToastedParmesanIcon from "../assets/images/icon_finisher_ToastedParm_whole_2017.webp";
import NoCrustFlavorIcon from "../assets/images/icon_finisher_none_whole_2017.webp";
import { HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN } from "./crustMetadata";

export const NO_CRUST_FLAVOR = "No Crust Flavor";
export const GARLIC_BUTTERY_BLEND = "Garlic Buttery Blend";
export const TOASTED_PARMESAN = "Toasted Parmesan";

export const crust_flavors = [NO_CRUST_FLAVOR, GARLIC_BUTTERY_BLEND, TOASTED_PARMESAN];

export const crustFlavorImageMapping = {
    [NO_CRUST_FLAVOR]: {
        icon: NoCrustFlavorIcon
    },
    [GARLIC_BUTTERY_BLEND]: {
        [HAND_TOSSED]: {
            preview: HTGarlicButteryBlendPreview,
        },
        [THIN_N_CRISPY]: {
            preview: ThinGarlicButteryBlendPreview
        },
        [ORIGINAL_PAN]: {
            preview: PanGarlicButteryBlendPreview
        },
        icon: GarlicButteryBlendIcon
    },
    [TOASTED_PARMESAN]: {
        [HAND_TOSSED]: {
            preview: HTToastedParmesanPreview,
        },
        [THIN_N_CRISPY]: {
            preview: ThinToastedParmesanPreview
        },
        [ORIGINAL_PAN]: {
            preview: PanToastedParmesanPreview
        },
        icon: ToastedParmesanIcon
    }
}