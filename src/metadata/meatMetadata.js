import PepperoniPreview from "../assets/images/topping_Pepperoni_ML_reg.webp";
import ExtraPepperoniPreview from "../assets/images/topping_Pepperoni_ML_extra.webp";
import PepperoniIcon from "../assets/images/icon_topping_Pepperoni.webp";
import ItalianSausagePreview from "../assets/images/topping_ItalianSausage_ML_reg.webp";
import ExtraItalianSausagePreview from "../assets/images/topping_ItalianSausage_ML_extra.webp";
import ItalianSausageIcon from "../assets/images/icon_topping_ItalianSausage.webp";
import HamPreview from "../assets/images/topping_Ham_ML_reg.webp";
import ExtraHamPreview from "../assets/images/topping_Ham_ML_extra.webp";
import HamIcon from "../assets/images/icon_topping_Ham.webp";
import BaconPreview from "../assets/images/topping_Bacon_ML_reg.webp";
import ExtraBaconPreview from "../assets/images/topping_Bacon_ML_extra.webp";
import BaconIcon from "../assets/images/icon_topping_Bacon.webp";
import GrilledChickenPreview from "../assets/images/topping_Chicken_ML_reg.webp";
import ExtraGrilledChickenPreview from "../assets/images/topping_Chicken_ML_extra.webp";
import GrilledChickenIcon from "../assets/images/icon_topping_Chicken.webp";
import BeefPreview from "../assets/images/topping_Beef_ML_reg.webp";
import ExtraBeefPreview from "../assets/images/topping_Beef_ML_extra.webp";
import BeefIcon from "../assets/images/icon_topping_Beef.webp";
import PorkPreview from "../assets/images/topping_Pork_ML_reg.webp";
import ExtraPorkPreview from "../assets/images/topping_Pork_ML_extra.webp";
import PorkIcon from "../assets/images/icon_topping_Pork.webp";
 
/* All metadata related to the display of meat options */

export const PEPPERONI = "Pepperoni";
export const ITALIAN_SAUSAGE = "Italian Sausage";
export const HAM = "Ham";
export const BACON = "Bacon";
export const GRILLED_CHICKEN = "Grilled Chicken";
export const BEEF = "Beef";
export const PORK = "Pork";

export const meatImageMapping = {
    [PEPPERONI]: {
        preview: PepperoniPreview,
        previewExtra: ExtraPepperoniPreview,
        icon: PepperoniIcon
    },
    [ITALIAN_SAUSAGE]: {
        preview: ItalianSausagePreview,
        previewExtra: ExtraItalianSausagePreview,
        icon: ItalianSausageIcon
    },
    [HAM]: {
        preview: HamPreview,
        previewExtra: ExtraHamPreview,
        icon: HamIcon
    },
    [BACON]: {
        preview: BaconPreview,
        previewExtra: ExtraBaconPreview,
        icon: BaconIcon
    },
    [GRILLED_CHICKEN]: {
        preview: GrilledChickenPreview,
        previewExtra: ExtraGrilledChickenPreview,
        icon: GrilledChickenIcon
    },
    [BEEF]: {
        preview: BeefPreview,
        previewExtra: ExtraBeefPreview,
        icon: BeefIcon
    },
    [PORK]: {
        preview: PorkPreview,
        previewExtra: ExtraPorkPreview,
        icon: PorkIcon
    }
}