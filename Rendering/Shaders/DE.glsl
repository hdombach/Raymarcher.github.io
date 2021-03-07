
//IMPORT ./Rendering/Shaders/bulbDE.glsl
//IMPORT ./Rendering/Shaders/boxDE.glsl
//IMPORT ./Rendering/Shaders/sphereDE.glsl

float DE(vec4 pos) {
    //return boxDE(pos.xyz, vec3(1));
    return bulbDE(pos);
}