import React, { Children } from "react";
import { HeadlineSize } from "../models";

interface IHeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
    size: HeadlineSize;
}

export function Headline({ size, ...props }: IHeadlineProps) {
    switch (size) {
        case HeadlineSize.H3: {
            return (
                <h3 className={`text-2xl ${props.className}`} {...props} />
            );
        }
        case HeadlineSize.H2: {
            return (
                <h3 className={`text-3xl ${props.className}`} {...props} />
            );
        }
        case HeadlineSize.H1:
        default: {
            return (
                <h1 className={`text-4xl ${props.className}`} {...props} />
            );
        }
    }
}