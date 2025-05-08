function getMatrixSize(matrix: ReadonlyArray<ReadonlyArray<number>>) {
    const matrixSize = [1, 1];

    // We need to find the widest row and tallest column to get the correct
    // matrix size.
    matrix.forEach((matrixRow, row) => {
        let rowWidth = 0;
        matrixRow.forEach((matrixCol, col) => {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (matrixCol != null && matrixCol.toString().length) {
                rowWidth = col + 1;
            }
        });

        // Matrix width:
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        matrixSize[1] = Math.max(matrixSize[1], rowWidth);

        // Matrix height:
        if (rowWidth > 0) {
            // TODO(LEMS-3083): Remove eslint suppression
            // eslint-disable-next-line functional/immutable-data
            matrixSize[0] = Math.max(matrixSize[0], row + 1);
        }
    });
    return matrixSize;
}

export default getMatrixSize;
