export function isGif(url: string): boolean {
    // Trying to do this the "right way" by loading in the image and counting
    // frames would ad more complexity than we need here. With our CDN's filename
    // structure, we can assume that all .gif images will have a URL ending in .gif.
    return url.endsWith(".gif");
}

export const earthMoonImage = {
    url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
    width: 400,
    height: 225,
};

export const frescoImage = {
    url: "https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg",
    width: 1698,
    height: 955,
};

export const portraitImage = {
    url: "https://cdn.kastatic.org/ka-content-images/45f60d824fb772181a1361352c9df64f9cca3e5a.jpg",
    width: 1398,
    height: 1851,
};
export const portraitImageTitle = "The Arnolfini Portrait";
export const portraitImageCaption =
    "Jan van Eyck, *The Arnolfini Portrait*, 1434, oil on oak panel, 82.2 x 60 cm (National Gallery, London; photo: [Steven Zucker](https://flic.kr/p/2qEGNDi), CC BY-NC-SA 4.0)";
export const portraitImageLongDescription =
    "Jan van Eyck, The Arnolfini Portrait, 1434, oil on oak panel, 82.2 x 60 cm (National Gallery, London; photo: Steven Zucker, CC BY-NC-SA 4.0)";

export const scienceImage = {
    url: "https://cdn.kastatic.org/ka-content-images/4f38f705977774bcac3b5bed9f81b56710abc8b0.png",
    width: 300,
    height: 223,
};
export const scienceImageCaption =
    "*A diagram of prophase. During this stage of mitosis, chromosomes condense, the nuclear envelope breaks apart, and the mitotic spindle begins to form. Created with [Biorender.com](BioRender.com).*";
export const scienceImageAlt = "A diagram shows a single, circular cell.";

export const graphieImage = {
    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/2ac8f769a7323f55e41c12cfa39e774be08bc138",
    width: 420,
    height: 345,
};
export const graphieImageAlt =
    "An array of isosceles triangles. A triangle has height A. Two smaller triangle, one with height B and one with height C, have approximately the same combined height as A.";

export const gifImage = {
    url: "https://cdn.kastatic.org/ka-content-images/79affe6b539eb0e163aa96b42160e53cad4b2097.gif",
    width: 500,
    height: 285,
};

export const gifImageAlt =
    "A person on a skateboard moves back and forth across a concrete structure that forms the shape of a U.";
