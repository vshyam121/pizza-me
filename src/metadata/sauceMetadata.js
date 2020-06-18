import ClassicMarinaraIcon from "../assets/images/icon_sauce_Marinara.webp"
import CreamyGarlicParmesanIcon from "../assets/images/icon_sauce_CreamyGarlicParm.webp";
import BarbequeIcon from "../assets/images/icon_sauce_BBQ.webp";
import BuffaloIcon from "../assets/images/icon_sauce_Buffalo.webp";

/* All metadata related to the display of sauce options */

export const CLASSIC_MARINARA = "Classic Marinara";
export const CREAMY_GARLIC_PARMESAN = "Creamy Garlic Parmesan"
export const BARBECUE = "Barbeque";
export const BUFFALO = "Buffalo";

export const sauceImageMapping = {
    [CLASSIC_MARINARA]: {
        icon: ClassicMarinaraIcon
    },
    [CREAMY_GARLIC_PARMESAN]: {
        icon: CreamyGarlicParmesanIcon
    },
    [BARBECUE]: {
        icon: BarbequeIcon
    },
    [BUFFALO]: {
        icon: BuffaloIcon
    }
}

export const REGULAR_SAUCE = "Regular";
export const EXTRA_SAUCE = "Extra";
export const LIGHT_SAUCE = "Light";
export const NO_SAUCE = "None";

export const sauceAmounts = [EXTRA_SAUCE, REGULAR_SAUCE, LIGHT_SAUCE, NO_SAUCE];

export const sauceAmountMetadataMapping = {
    [EXTRA_SAUCE]: {
        price: "+$1.00"
    }
}


