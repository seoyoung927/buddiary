import { atom } from "recoil";
import { getNewDateObj } from "../utils";

export const SelectedDay = atom({
    key: "selectedDay",
    default: getNewDateObj(new Date()),
});
