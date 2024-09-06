import { useEffect, useState } from "react";

export type DeviceBreakpoint = "mobile" | "tablet" | "desktop";
export type MediaQueryWidths = {
    min: number;
    max?: number;
};
export const MEDIA_QUERY_WIDTHS: Record<DeviceBreakpoint, MediaQueryWidths> = {
    mobile: { min: 320, max: 767.9 },
    tablet: { min: 768, max: 1023.9 },
    desktop: {
        min: 1024,
    }
};

const getMatchMedia = (breakpoint: DeviceBreakpoint) => {
    const { min, max } = MEDIA_QUERY_WIDTHS[breakpoint];

    const maxWidth = max !== undefined ? ` and (max-width: ${max}px)` : "";

    const minWidth = breakpoint === "mobile" ? 0 : min;

    return window.matchMedia(`(min-width: ${minWidth}px)${maxWidth}`);
};

export const useMediaQuery = (breakpoint: DeviceBreakpoint) => {
    const [mediaQueryList, setMediaQueryList] = useState(
        getMatchMedia(breakpoint)
    );

    const [matches, setMatches] = useState(mediaQueryList.matches);

    useEffect(() => {
        setMediaQueryList(getMatchMedia(breakpoint));
    }, [breakpoint]);

    useEffect(() => {
        const handleMediaChange = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", handleMediaChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleMediaChange);
        };
    }, [mediaQueryList]);

    return matches;
};
