import HandTossedPreview from "../assets/images/crust_ht_NoFinish.webp"
import HandTossedIcon from "../assets/images/icon_crust_ht.webp";
import ThinNCrispyPreview from "../assets/images/crust_thin_NoFinish.webp";
import ThinNCrispyIcon from "../assets/images/icon_crust_thin.webp";
import OriginalPanPreview from "../assets/images/crust_pan_NoFinish.webp";
import OriginalPanIcon from "../assets/images/icon_crust_pan.webp";

export const HAND_TOSSED = "Hand Tossed Pizza";
export const THIN_N_CRISPY = "Thin 'N Crispy Pizza";
export const ORIGINAL_PAN = "Original Pan Pizza";

export const crustTypes = [HAND_TOSSED, THIN_N_CRISPY, ORIGINAL_PAN];

export const crustImageMapping = {
    [HAND_TOSSED]: {
        preview: HandTossedPreview,
        icon: HandTossedIcon
    },
    [THIN_N_CRISPY]: {
        preview: ThinNCrispyPreview,
        icon: ThinNCrispyIcon
    },
    [ORIGINAL_PAN]: {
        preview: OriginalPanPreview,
        icon: OriginalPanIcon
    }
}