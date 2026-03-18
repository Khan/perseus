import {act} from "@testing-library/react";

/**
 * Mocks image loading done by the ImageLoader component to immediately trigger
 * the load event.
 * @returns A function to unmock the image loading
 */
export const mockImageLoading = (options?: {
    naturalWidth?: number;
    naturalHeight?: number;
}) => {
    const originalImage = window.Image;

    const mockImage = jest.fn(() => {
        const img = {
            naturalWidth: options?.naturalWidth,
            naturalHeight: options?.naturalHeight,
        } as HTMLImageElement;
        // Immediately trigger onload using setTimeout to ensure it happens after render
        setTimeout(() => {
            if (img.onload) {
                act(() => {
                    img.onload!(new Event("load"));
                });
            }
        }, 0);

        global.fetch = jest.fn((url) => {
            return Promise.resolve({
                text: () => Promise.resolve(""),
                // Minimal GCE block (100 ms loop) for getGifLoopDuration in svg-image.tsx
                arrayBuffer: () =>
                    Promise.resolve(
                        new Uint8Array([
                            0x21, 0xf9, 0x04, 0x00, 0x0a, 0x00, 0x00, 0x00,
                        ]).buffer,
                    ),
                ok: true,
            });
        }) as jest.Mock;

        return img;
    });

    window.Image = mockImage as any;

    return () => {
        window.Image = originalImage;
    };
};
