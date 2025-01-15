import Tesla from "../../../assets/images/tesla_img.png";
import Type2 from "../../../assets/images/type2_img.png";
import CCS2 from "../../../assets/images/ccs6_img.png";
import Chademo from "../../../assets/images/chademo_img.png";

import type2Marker from '../../../assets/images/unselected_yellow.png';
import chademoMarker from '../../../assets/images/unselected_blue.png';
import ccsMarker from '../../../assets/images/unselected_red.png';
import teslaMarker from '../../../assets/images/unselected_green.png';

import selecType2Marker from '../../../assets/images/selected_yellow.png';
import selecChademoMarker from '../../../assets/images/selected_blue.png';
import selecCcsMarker from '../../../assets/images/selected_red_2.png';
import selecTeslaMarker from '../../../assets/images/selected_green.png';

import Neste from "../../../assets/images/neste_logo.png";
import ABC from "../../../assets/images/abc_logo.png";
import Recharge from "../../../assets/images/recharge_logo.png";
import Helen from "../../../assets/images/helen_logo.png";
import Virta from "../../../assets/images/virta_logo.png";
import Lidl from "../../../assets/images/lidl_logo.png";
import KLataus from "../../../assets/images/klataus_logo.png";
import TeslaLogo from "../../../assets/images/tesla_logo.png";

const providerImages = {
    Neste,
    ABC,
    Recharge,
    Helen,
    Virta,
    Tesla: TeslaLogo,
    Lidl,
    "K-Lataus": KLataus,
};

const providers = ["Neste", "ABC", "Recharge", "Helen", "Virta", "Tesla", "Lidl", "K-Lataus"];

const connectorImages = {
    "Type 2": Type2,
    CCS: CCS2,
    CHAdeMO: Chademo,
    Tesla: Tesla,
    "Type 2 Socket": Type2,
    "Type 2 Tethered": Type2,
    "Type F": null,
};

const connectorColors = {
    "Type 2": "text-ctaYellow",
    CCS: "text-salmonRed",
    CHAdeMO: "text-electricBlue",
    Tesla: "text-eGreen",
    "Type 2 Socket": "text-ctaYellow",
    "Type 2 Tethered": "text-ctaYellow",
    "Type F": "text-gray-400",
};

const connectorMarkerImages = {
    unselected: {
        "Type 2": type2Marker,
        "CHAdeMO": chademoMarker,
        "CCS": ccsMarker,
        "Tesla": teslaMarker,
        "Type 1": type2Marker,
        "Type F": type2Marker,
    },
    selected: {
        "Type 2": selecType2Marker,
        "CHAdeMO": selecChademoMarker,
        "CCS": selecCcsMarker,
        "Tesla": selecTeslaMarker,
        "Type 1": selecType2Marker,
        "Type F": selecType2Marker,
    },
};

const connectorTypes = {
    33: "CCS",
    25: "Type 2",
    1036: "Type 2",
    30: "Tesla",
    27: "Tesla",
    32: "Type 1",
    2: "CHAdeMO",
    28: "Type F",
};

export { providers, connectorImages, connectorColors, connectorTypes, connectorMarkerImages, providerImages };