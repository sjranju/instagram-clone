import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState, usedispatch } from "./configStore";
import { useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<usedispatch>()