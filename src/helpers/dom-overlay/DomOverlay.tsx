import React, {CSSProperties, PropsWithChildren, Ref} from "react";

export interface DomOverlayProps {
    visible?: boolean;
    innerRef?: Ref<HTMLDivElement>;
    style?: CSSProperties;
}

export const DomOverlay = (props: PropsWithChildren<DomOverlayProps>) => {

    const {children, innerRef, style, visible = false} = props;

    return (
        <div ref={innerRef} id="dom-overlay" style={style}>
            {visible && children}
        </div>
    );
};