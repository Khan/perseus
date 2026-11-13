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

    // A `function`, not an arrow: the code under test calls `new Image()`,
    // and some test runners construct a mock's implementation with `new`.
    const mockImage = jest.fn(function () {
        // eslint-disable-next-line no-restricted-syntax
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

        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn((url) => {
            return Promise.resolve({
                text: () => Promise.resolve(""),
                ok: true,
            });
        }) as jest.Mock;

        return img;
    });

    // eslint-disable-next-line no-restricted-syntax
    window.Image = mockImage as any;

    return () => {
        window.Image = originalImage;
    };
};
