import {act} from "@testing-library/react";

/**
 * Mocks image loading done by the ImageLoader component to immediately trigger
 * the load event.
 * @returns A function to unmock the image loading
 */
export const mockImageLoading = () => {
    const originalImage = window.Image;

    const mockImage = jest.fn(() => {
        const img = {} as HTMLImageElement;
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
