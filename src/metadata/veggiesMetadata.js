import MushroomsPreview from "../assets/images/topping_Mushroom_ML_reg.png";
import ExtraMushroomsPreview from "../assets/images/topping_Mushroom_ML_extra.png";
import MushroomsIcon from "../assets/images/icon_topping_Mushroom.png";
import RoastedSpinachPreview from "../assets/images/topping_Spinach_Fresh_ML_reg.png";
import ExtraRoastedSpinachPreview from "../assets/images/topping_Spinach_Fresh_ML_extra.png";
import RoastedSpinachIcon from "../assets/images/icon_topping_Spinach_fresh.png";
import RedOnionsPreview from "../assets/images/topping_Onion_red_ML_reg.png";
import ExtraRedOnionsPreview from "../assets/images/topping_Onion_red_ML_extra.png";
import RedOnionsIcon from "../assets/images/icon_topping_Onion_Red.png";
import OlivesPreview from "../assets/images/topping_Olives_black_ML_reg.png";
import ExtraOlivesPreview from "../assets/images/topping_Olives_black_ML_extra.png";
import OlivesIcon from "../assets/images/icon_topping_Olive_black.png";
import BellPeppersPreview from "../assets/images/topping_GreenBellPepper_ML_reg.png";
import ExtraBellPeppersPreview from "../assets/images/topping_GreenBellPepper_ML_reg.png";
import BellPeppersIcon from "../assets/images/icon_topping_GreenBellPepper.png";
import BananaPeppersPreview from "../assets/images/topping_BananaPepper_ML_reg.png";
import ExtraBananaPeppersPreview from "../assets/images/topping_BananaPepper_ML_extra.png";
import BananaPeppersIcon from "../assets/images/icon_topping_BananaPepper.png";
import PineapplePreview from "../assets/images/topping_Pineapple_ML_reg.png";
import ExtraPineapplePreview from "../assets/images/topping_Pineapple_ML_extra.png";
import PineappleIcon from "../assets/images/icon_topping_Pineapple.png";
import JalapenoPeppersPreview from "../assets/images/topping_Jalepeno_ML_reg.png";
import ExtraJalapenoPeppersPreview from "../assets/images/topping_Jalepeno_ML_extra.png";
import JalapenoPeppersIcon from "../assets/images/icon_topping_Jalapeno.png";
import RomaTomatoesPreview from "../assets/images/topping_Tomato_ML_reg.png";
import ExtraRomaTomatoesPreview from "../assets/images/topping_Tomato_ML_extra.png";
import RomaTomatoesIcon from "../assets/images/icon_topping_Tomato.png";

/* All metadata related to the display of veggy options */

export const MUSHROOMS = "Mushrooms";
export const ROASTED_SPINACH = "Roasted Spinach";
export const RED_ONIONS = "Red Onions";
export const OLIVES = "Mediterranean Black Olives";
export const BELL_PEPPERS = "Green Bell Peppers";
export const BANANA_PEPPERS = "Banana Peppers";
export const PINEAPPLE = "Pineapple";
export const JALAPENO_PEPPERS = "Jalapeno Peppers";
export const ROMA_TOMATOES = "Roma Tomatoes";

export const veggiesImageMapping = {
    [MUSHROOMS]: {
        preview: MushroomsPreview,
        previewExtra: ExtraMushroomsPreview,
        icon: MushroomsIcon
    },
    [ROASTED_SPINACH]: {
        preview: RoastedSpinachPreview,
        previewExtra: ExtraRoastedSpinachPreview,
        icon: RoastedSpinachIcon
    },
    [RED_ONIONS]: {
        preview: RedOnionsPreview,
        previewExtra: ExtraRedOnionsPreview,
        icon: RedOnionsIcon
    },
    [OLIVES]: {
        preview: OlivesPreview,
        previewExtra: ExtraOlivesPreview,
        icon: OlivesIcon
    },
    [BELL_PEPPERS]: {
        preview: BellPeppersPreview,
        previewExtra: ExtraBellPeppersPreview,
        icon: BellPeppersIcon
    },
    [BANANA_PEPPERS]: {
        preview: BananaPeppersPreview,
        previewExtra: ExtraBananaPeppersPreview,
        icon: BananaPeppersIcon
    },
    [PINEAPPLE]: {
        preview: PineapplePreview,
        previewExtra: ExtraPineapplePreview,
        icon: PineappleIcon
    },
    [JALAPENO_PEPPERS]: {
        preview: JalapenoPeppersPreview,
        previewExtra: ExtraJalapenoPeppersPreview,
        icon: JalapenoPeppersIcon
    },
    [ROMA_TOMATOES]: {
        preview: RomaTomatoesPreview,
        previewExtra: ExtraRomaTomatoesPreview,
        icon: RomaTomatoesIcon
    }
}