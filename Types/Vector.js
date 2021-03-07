

// [0, 1, 2, 3]
class Vector {
    length(vector) {
        return vector.length;
    }

    dot(vector1, vector2) {
        var vLength = vector1.length
        var output = 0;
        if (vLength == vector2.length) {
            for (i = 0; i < vLength; i++) {
                output += vector1[i] * vector2[i];
            }
        }

        return output;
    }
}

export default Vector;