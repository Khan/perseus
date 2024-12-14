// A very simple test case following our modern jsonp format
// the url key is used for testing during the svg-image.test
export const typicalCase = {
    hash: "ccefe63aa1bd05f1d11123f72790a49378d2e42b",
    jsonpString: `svgDataccefe63aa1bd05f1d11123f72790a49378d2e42b({"range":null,"labels":[]});`,
    expectedData: {
        range: null,
        labels: [],
    },
    expectedLocalizedUrl:
        "https://ka-perseus-graphie.s3.amazonaws.com/es/ccefe63aa1bd05f1d11123f72790a49378d2e42b-data.json",
    url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/ccefe63aa1bd05f1d11123f72790a49378d2e42b",
};
// These test cases were taken from a graphies-that-cant-unmarshal.txt report commented on LEMS-2524
export const edgeCases = [
    {
        hash: "e6d79d238e162da3fde14f0c19b106ce9bc6ad9b",
        jsonpString: `svgDatae6d79d238e162da3fde14f0c19b106ce9bc6ad9b({"range":[[0,8.035714285714286],[0,8]]});`,
        expectedData: {
            range: [
                [0, 8.035714285714286],
                [0, 8],
            ],
        },
    },
    {
        hash: "e9b2325f3c269c297a45ee7a1f0c08f94524c02a",
        jsonpString: `svgDatae9b2325f3c269c297a45ee7a1f0c08f94524c02a({"range":[[-1,10],[-2,8]]});`,
        expectedData: {
            range: [
                [-1, 10],
                [-2, 8],
            ],
        },
    },
    {
        hash: "ec517be364d82b35255739914788611cf5ea613b",
        jsonpString: `svgDataec517be364d82b35255739914788611cf5ea613b({"range":[[-30,450],[-200,30]]});`,
        expectedData: {
            range: [
                [-30, 450],
                [-200, 30],
            ],
        },
    },
    {
        hash: "f4ffe7752049f27a5c2455110c0674b4719be71b",
        jsonpString: `svgDataf4ffe7752049f27a5c2455110c0674b4719be71b({"range":[[-10,10],[-10,10]]});`,
        expectedData: {
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
    },
    {
        hash: "f66b79d3b313fe1355ef13900811dfe357e3ef2e",
        jsonpString: `svgDataf66b79d3b313fe1355ef13900811dfe357e3ef2e({"range":[[-1,11],[-4,7]]});`,
        expectedData: {
            range: [
                [-1, 11],
                [-4, 7],
            ],
        },
    },
    {
        hash: "f81685c5f3fe2803c852fb02d82d056809c56756",
        jsonpString: `svgDataf81685c5f3fe2803c852fb02d82d056809c56756({"range":[[-2.4,2.4],[-2.4,2.4]]});`,
        expectedData: {
            range: [
                [-2.4, 2.4],
                [-2.4, 2.4],
            ],
        },
    },
    {
        hash: "0bee5f48020fb411157295c08069ddac20567ad5",
        jsonpString: `svgOtherData0bee5f48020fb411157295c08069ddac20567ad5({"range":[[0,8.035714285714286],[0,8]]});`,
        expectedData: {
            range: [
                [0, 8.035714285714286],
                [0, 8],
            ],
        },
    },
    {
        hash: "0c7064037164b2e3b1843314a35c08289200cc8b",
        jsonpString: `svgOtherData0c7064037164b2e3b1843314a35c08289200cc8b({"range":[[-10,11.25],[-10,11.25]]});`,
        expectedData: {
            range: [
                [-10, 11.25],
                [-10, 11.25],
            ],
        },
    },
    {
        hash: "100d69992add52a7c33d4cfd7cfd0c958816a647",
        jsonpString: `svgOtherData100d69992add52a7c33d4cfd7cfd0c958816a647({"range":[[0,6],[0,5]]});`,
        expectedData: {
            range: [
                [0, 6],
                [0, 5],
            ],
        },
    },
    {
        hash: "11a5934e79a80efad4b2507d6f10c7f38c1c59b7",
        jsonpString: `svgOtherData11a5934e79a80efad4b2507d6f10c7f38c1c59b7({"range":[[-7.05,7.05],[-7.05,7.05]]});`,
        expectedData: {
            range: [
                [-7.05, 7.05],
                [-7.05, 7.05],
            ],
        },
    },
    {
        hash: "158dd1c6ff2979c1b4df4b99d80452c6b8a66b61",
        jsonpString: `svgOtherData158dd1c6ff2979c1b4df4b99d80452c6b8a66b61({"range":[[-1,4],[-4,1]]});`,
        expectedData: {
            range: [
                [-1, 4],
                [-4, 1],
            ],
        },
    },
    {
        hash: "168938e468fc07899356eb24c28228ff2efa17cc",
        jsonpString: `svgOtherData168938e468fc07899356eb24c28228ff2efa17cc({"range":[[0,4],[0,6.5]]});`,
        expectedData: {
            range: [
                [0, 4],
                [0, 6.5],
            ],
        },
    },
    {
        hash: "1f8dccef71c744a319d14c353056acb5a08b0ffd",
        jsonpString: `svgOtherData1f8dccef71c744a319d14c353056acb5a08b0ffd({"range":[[-0.1,10.1],[1.4,2.6]]});`,
        expectedData: {
            range: [
                [-0.1, 10.1],
                [1.4, 2.6],
            ],
        },
    },
    {
        hash: "23ff310be4a4d0419cbfce217c1ec200dcf9b7cb",
        jsonpString: `svgOtherData23ff310be4a4d0419cbfce217c1ec200dcf9b7cb({"range":[[-0.1,8.1],[-0.1,4.1]]});`,
        expectedData: {
            range: [
                [-0.1, 8.1],
                [-0.1, 4.1],
            ],
        },
    },
    {
        hash: "2f7378f0b9f63ce35391e957659d77049fad922e",
        jsonpString: `svgOtherData2f7378f0b9f63ce35391e957659d77049fad922e({"range":[[0,6],[0,8]]});`,
        expectedData: {
            range: [
                [0, 6],
                [0, 8],
            ],
        },
    },
    {
        hash: "3037b142b2327d142892f823e4777897e421e722",
        jsonpString: `{"range":[[-0.6513157894736842,3.5171052631578945],[-2.5,10.833333333333334]]}`,
        expectedData: {
            range: [
                [-0.6513157894736842, 3.5171052631578945],
                [-2.5, 10.833333333333334],
            ],
        },
    },
    {
        hash: "3266286570a06059eaa49a07f49b0dae63cf0cf0",
        jsonpString: `svgOtherData3266286570a06059eaa49a07f49b0dae63cf0cf0({"range":[[-0.5,15.5],[-3.5,1.5]]});`,
        expectedData: {
            range: [
                [-0.5, 15.5],
                [-3.5, 1.5],
            ],
        },
    },
    {
        hash: "3404872c44d1d00e3e38771b8ad40b8228c82629",
        jsonpString: `svgOtherData3404872c44d1d00e3e38771b8ad40b8228c82629({"range":[[-0.5,20.5],[-2.5,4.5]]});`,
        expectedData: {
            range: [
                [-0.5, 20.5],
                [-2.5, 4.5],
            ],
        },
    },
    {
        hash: "345fbf69f7eca6ce674ad0a431756cfa6efe81af",
        jsonpString: `svgOtherData345fbf69f7eca6ce674ad0a431756cfa6efe81af({"range":[[-10,11.25],[-10,11.25]]});`,
        expectedData: {
            range: [
                [-10, 11.25],
                [-10, 11.25],
            ],
        },
    },
    {
        hash: "592497b6387209e77d376323da33df5dc5ce9622",
        jsonpString: `svgOtherData592497b6387209e77d376323da33df5dc5ce9622({"range":[[-0.54,4.54],[-0.54,0.54]]});`,
        expectedData: {
            range: [
                [-0.54, 4.54],
                [-0.54, 0.54],
            ],
        },
    },
    {
        hash: "5c77fac14204132689a97b47b39e2f95c591b6d5",
        jsonpString: `svgOtherData5c77fac14204132689a97b47b39e2f95c591b6d5({"range":[[-1,9],[-26,1]]});`,
        expectedData: {
            range: [
                [-1, 9],
                [-26, 1],
            ],
        },
    },
    {
        hash: "5e09a641003749c2e5bad2da604f96fced218347",
        jsonpString: `{"range":[[-0.6513157894736842,3.5171052631578945],[-5,21.666666666666668]]}`,
        expectedData: {
            range: [
                [-0.6513157894736842, 3.5171052631578945],
                [-5, 21.666666666666668],
            ],
        },
    },
    {
        hash: "6e5f23adac003fc5e0f85593366d266df6c867f3",
        jsonpString: `svgOtherData6e5f23adac003fc5e0f85593366d266df6c867f3({"range":[[-7.05,7.05],[-7.05,7.05]]});`,
        expectedData: {
            range: [
                [-7.05, 7.05],
                [-7.05, 7.05],
            ],
        },
    },
    {
        hash: "77565c2aa3dafb76e717e609c95afbe852b9c7bb",
        jsonpString: `{"range":[[-0.54,4.54],[-0.54,0.54]]}`,
        expectedData: {
            range: [
                [-0.54, 4.54],
                [-0.54, 0.54],
            ],
        },
    },
    {
        hash: "7bb7da5c8c69b185da9aa17f359e0ecb39d8ff0f",
        jsonpString: `svgOtherData7bb7da5c8c69b185da9aa17f359e0ecb39d8ff0f({"range":[[-4,4],[-4,4]]});`,
        expectedData: {
            range: [
                [-4, 4],
                [-4, 4],
            ],
        },
    },
    {
        hash: "7d75523b0c647d20747b67f77ea6ed3a98eaf470",
        jsonpString: `svgOtherData7d75523b0c647d20747b67f77ea6ed3a98eaf470({"range":[[-0.54,4.54],[-0.54,1.54]]});`,
        expectedData: {
            range: [
                [-0.54, 4.54],
                [-0.54, 1.54],
            ],
        },
    },
    {
        hash: "873d919d2bc04b798dcbe0e56c83504aaa291b0e",
        jsonpString: `svgOtherData873d919d2bc04b798dcbe0e56c83504aaa291b0e({"range":[[-7.05,7.05],[-7.05,7.05]]});`,
        expectedData: {
            range: [
                [-7.05, 7.05],
                [-7.05, 7.05],
            ],
        },
    },
    {
        hash: "891297fdfd43ca1c1904c92a96d578c0885f7403",
        jsonpString: `svgOtherData891297fdfd43ca1c1904c92a96d578c0885f7403({"range":[[-10,11.25],[-10,11.25]]});`,
        expectedData: {
            range: [
                [-10, 11.25],
                [-10, 11.25],
            ],
        },
    },
    {
        hash: "89ca408ee52f2a2f40be6e4aa33ca57c4675bd5e",
        jsonpString: `svgOtherData89ca408ee52f2a2f40be6e4aa33ca57c4675bd5e({"range":[[-10,10],[-10,10]]});`,
        expectedData: {
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
    },
    {
        hash: "8a7541628f10dc00a361345298f6088bf8242db0",
        jsonpString: `svgOtherData8a7541628f10dc00a361345298f6088bf8242db0({"range":[[-30,450],[-200,30]]});`,
        expectedData: {
            range: [
                [-30, 450],
                [-200, 30],
            ],
        },
    },
    {
        hash: "8bf822c8357af9253a4596971fc31251a43cc546",
        jsonpString: `svgOtherData8bf822c8357af9253a4596971fc31251a43cc546({"range":[[-3.141592653589793,8.54120502694725],[-3,3.375]]});`,
        expectedData: {
            range: [
                [-3.141592653589793, 8.54120502694725],
                [-3, 3.375],
            ],
        },
    },
    {
        hash: "8f653527b48530d8af67b6baa06eb252e012d3a3",
        jsonpString: `{"range":[[-0.6513157894736842,3.5171052631578945],[-2.5,10.833333333333334]]}`,
        expectedData: {
            range: [
                [-0.6513157894736842, 3.5171052631578945],
                [-2.5, 10.833333333333334],
            ],
        },
    },
    {
        hash: "95dd4c96f5b00021de47f3ef0970bdfe42a1ab8f",
        jsonpString: `{"range":[[-2,10],[-2,6]]}`,
        expectedData: {
            range: [
                [-2, 10],
                [-2, 6],
            ],
        },
    },
    {
        hash: "9fce14bf31bfa5fb0ed739190b46131c6ddc9650",
        jsonpString: `svgOtherData9fce14bf31bfa5fb0ed739190b46131c6ddc9650({"range":[[-2,2],[-2,2]]});`,
        expectedData: {
            range: [
                [-2, 2],
                [-2, 2],
            ],
        },
    },
    {
        hash: "a26efe2b47085fdcd7553221e0fdbf5127ea4943",
        jsonpString: `{"range":[[-0.54,0.54],[-0.54,0.54]]}`,
        expectedData: {
            range: [
                [-0.54, 0.54],
                [-0.54, 0.54],
            ],
        },
    },
    {
        hash: "a74a8cd51f03b5166a9d1744c8945f7194442fd6",
        jsonpString: `{"range":[[-2.4,2.4],[-2.4,2.4]]}`,
        expectedData: {
            range: [
                [-2.4, 2.4],
                [-2.4, 2.4],
            ],
        },
    },
    {
        hash: "ac784c1452c7173721f137db5bfd1f0d7d7a25cf",
        jsonpString: `svgOtherDataac784c1452c7173721f137db5bfd1f0d7d7a25cf({"range":[[-10,10],[-10,10]]});`,
        expectedData: {
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
    },
    {
        hash: "b1bc0c4ba3f62dcccd99ea8600cec1367cbfdff9",
        jsonpString: `svgOtherDatab1bc0c4ba3f62dcccd99ea8600cec1367cbfdff9({"range":[[-10,11.25],[-10,11.25]]});`,
        expectedData: {
            range: [
                [-10, 11.25],
                [-10, 11.25],
            ],
        },
    },
    {
        hash: "b446726411c9d3f8188805e2cf7bff121bf0befa",
        jsonpString: `svgOtherDatab446726411c9d3f8188805e2cf7bff121bf0befa({"range":[[0,1],[0,4]]});`,
        expectedData: {
            range: [
                [0, 1],
                [0, 4],
            ],
        },
    },
    {
        hash: "b7bdb61124fce0b28c4eaa731c90a5fbafba69a6",
        jsonpString: `svgOtherDatab7bdb61124fce0b28c4eaa731c90a5fbafba69a6({"range":[[0,6],[0,5]]});`,
        expectedData: {
            range: [
                [0, 6],
                [0, 5],
            ],
        },
    },
    {
        hash: "c69ced35e04ff038d64a11b8969fafc3a725351a",
        jsonpString: `svgOtherDatac69ced35e04ff038d64a11b8969fafc3a725351a({"range":[[0,18],[-1,11.5]]});`,
        expectedData: {
            range: [
                [0, 18],
                [-1, 11.5],
            ],
        },
    },
    {
        hash: "ce95d2d7a6a57d5d3c74fb66040eebb627e35245",
        jsonpString: `svgOtherDatace95d2d7a6a57d5d3c74fb66040eebb627e35245({"range":[[0,11],[0,11]]});`,
        expectedData: {
            range: [
                [0, 11],
                [0, 11],
            ],
        },
    },
    {
        hash: "d0cabad9e056deca1c9d377a5476087a9fec967e",
        jsonpString: `svgOtherDatad0cabad9e056deca1c9d377a5476087a9fec967e({"range":[[0,11.5],[0,9.5]]});`,
        expectedData: {
            range: [
                [0, 11.5],
                [0, 9.5],
            ],
        },
    },
    {
        hash: "e4c132d07947a480f383d566a77aea36a2fa9dde",
        jsonpString: `svgOtherDatae4c132d07947a480f383d566a77aea36a2fa9dde({"range":[[-10,10],[-5,5]]});`,
        expectedData: {
            range: [
                [-10, 10],
                [-5, 5],
            ],
        },
    },
];
