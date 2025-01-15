import type2 from "../../assets/images/type2_img.png";
import ccs2 from "../../assets/images/ccs6_img.png";
import chademo from "../../assets/images/chademo_img.png";
import tesla from "../../assets/images/tesla_img.png";


export const ChargerTypeData = [
    {
        id: 1,
        type: "Type 2",
        label: "Type 2",
        description: "Standard connector for AC charging, compatible with most electric vehicles and public charging stations.",
        image: type2,
        bgColor: "bg-ctaYellow",
        textColor: "text-ctaYellow",
    },
    {
        id: 2,
        type: "CCS",
        label: "CCS",
        description: "Versatile connector supporting both AC and DC fast charging, ideal for efficient charging sessions.",
        image: ccs2,
        bgColor: "bg-salmonRed",
        textColor: "text-salmonRed",
    },
    {
        id: 3,
        type: "CHAdeMO",
        label: "CHAdeMO",
        description: "DC fast charging standard compatible with specific electric vehicles for rapid charging.",
        image: chademo,
        bgColor: "bg-electricBlue",
        textColor: "text-electricBlue",
    },
    {
        id: 4,
        type: "Tesla",
        label: "Tesla",
        description: "Tesla's proprietary connector, designed for fast and seamless charging with Tesla vehicles.",
        image: tesla,
        bgColor: "bg-eGreen",
        textColor: "text-eGreen",
    },
];
