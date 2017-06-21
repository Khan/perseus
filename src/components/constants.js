const devices = {
    PHONE: "phone",
    TABLET: "tablet",
    DESKTOP: "desktop",
};

module.exports = {
    devices: devices,
    // How many pixels do we reserve on the right-hand side of a preview
    // for displaying lint indicators? This space needs to be reserved
    // in DeviceFramer, but it is actually allocated in PerseusFrame
    lintGutterWidth: 36,
    // How wide a border does PerseusFrame draw? We need to allocate enough
    // space for it in DeviceFramer.
    perseusFrameBorderWidth: 1,
};
