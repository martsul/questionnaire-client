import { FC, ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type Props = {
    children: ReactElement;
    text: string;
    onClick: () => void;
};

export const TooltipButton: FC<Props> = ({ children, onClick, text }) => {
    return (
        <OverlayTrigger overlay={<Tooltip>{text}</Tooltip>}>
            <button type="button" onClick={onClick}>{children}</button>
        </OverlayTrigger>
    );
};
