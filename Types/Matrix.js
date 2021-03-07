import Vector from "./Vector.js"


//00, 10, 20, 30,
//01, 11, 21, 31,
//02, 12, 22, 32,
//03, 13, 23, 33,

class Matrix {
    /**
     * Returns the number of rows in the matrix
     * @param {Array} matrix 
     * @returns {Number}
     */
    rows(matrix) {
        return matrix[0].length;
    }
    /**
     * Retuns the number of columns in the matrix
     * @param {Array} matrix 
     * @returns {Number}
     */
    columns(matrix) {
        return matrix.length;
    }

    /**
     * 
     * @param {Array} matrix 
     * @param {Number} row 
     */
    getRow(matrix, row) {
        return matrix[row];
    }


    getColumn(matrix, column) {
        var output = [];
        for (row of matrix) {
            output.push(row[column]);
        }
        return output;
    }

    mult(m1, m2) {
        var length = this.columns(m1);
        var output = [];
        if (length == this.rows(m2)) {
            var rows = this.rows(m1);
            var columns = this.columns(m2);

            for (row = 0; row < rows; row++) {
                output.push([]);
                for (column = 0; column < columns; column++) {
                    output[row].push(Vector.dot(this.getRow(m1, row), this.getColumn(m2, column)));
                }
            }
        }

        return output;
    }
    
}

export default Matrix;