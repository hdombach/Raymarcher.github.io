//NOTE: this is not currently being used
attribute vec2 vertPosition;

varying lowp vec2 vecPosition;

void main() {
    gl_Position = float4(vertPosition, 0, 1);
    vecPosition = vertPosition;
}