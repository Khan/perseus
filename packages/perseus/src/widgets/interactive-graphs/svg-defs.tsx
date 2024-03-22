import React from "react";

export const SvgDefs = () => (
    <defs>
        {/* This filter is used to create a background for text labels */}
        <filter id="background" x="-5%" width="110%" y="0%" height="100%">
            <feFlood floodColor="#FFF" floodOpacity="0.5" />
            <feComposite operator="over" in="SourceGraphic" />
        </filter>
    </defs>
);
