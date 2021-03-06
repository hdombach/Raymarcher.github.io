precision mediump float;

uniform vec4 cameraPosition;
uniform float cameraZoom;
uniform mat4 cameraMatrix;
uniform vec2 cameraResolution;
uniform float exposure;
uniform int maxMarches;
uniform float stepClamp;
uniform float ambientOcclusion;

varying lowp vec2 vecPosition;

const int MAX_ITERATIONS = 1000;

//IMPORT ./Rendering/Shaders/Types/ray.glsl
//IMPORT ./Rendering/Shaders/Types/camera.glsl
//IMPORT ./Rendering/Shaders/DE.glsl

void main() {
    Camera camera;
    camera.position = cameraPosition;
    camera.zoom = cameraZoom;
    camera.resolution = cameraResolution;
    camera.rotationMatrix = cameraMatrix;

    Ray currentRay = spawnRay(camera, vecPosition);
    float l = (length(currentRay.direction) - 1.0) * 1000.0 + 0.5;
    gl_FragColor = vec4(l, l, l, 1);
    //return;

    float d = 0.0;
    int steps = 0;
    for (int i = 1; i <= MAX_ITERATIONS; i++) {
        float step = DE(currentRay.position);
        currentRay = marchRay(currentRay, step);
        d += step;
        steps += 1;
        if (step < stepClamp || i > maxMarches) {
            break;
        }
        if (d > 100.0) {
            gl_FragColor = vec4(0, 0, 0, 0);
            return;
        }
    }

    

    float gray = 1.0 / exp(d * exposure);
    gray *= pow(ambientOcclusion, float(steps));
    gl_FragColor = vec4(gray, gray, gray, 1);
    return;
}