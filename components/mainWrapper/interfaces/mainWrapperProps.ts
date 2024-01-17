import { ReactNode } from "react";

import MainHeaderProps from "../../mainHeader/interfaces/mainHeaderProps";

export default interface MainWrapperProps extends MainHeaderProps {
    children: ReactNode;
}