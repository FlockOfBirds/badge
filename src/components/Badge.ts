import { DOM, createElement } from "react";
import * as classNames from "classnames";

import "../ui/Badge.css";

export interface BadgeProps {
    label?: string;
    value?: string;
    style?: string;
    clickable?: boolean;
    onClickAction?: () => void;
}

export const Badge = (props: BadgeProps) =>
    createElement("div",
        {
            className: classNames("widget-badge", { "widget-badge-link": props.clickable }),
            onClick: props.onClickAction
        },
        DOM.span({ className: "widget-badge-text" }, props.label),
        DOM.span({
            className: classNames("widget-badge", "badge", { [`label-${props.style}`]: !!props.style })
        }, props.value)
    );
