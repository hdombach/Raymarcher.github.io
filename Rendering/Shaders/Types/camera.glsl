

//IMPORT ./Rendering/Shaders/Types/ray.glsl

struct Camera {
  vec4 position;
  float zoom;
  vec2 resolution;
  mat4 rotationMatrix;
};



Ray spawnRay(Camera camera, vec2 texCoord) {
  vec4 rayDirection = vec4(texCoord.x * camera.resolution.x / camera.resolution.y, texCoord.y, camera.zoom, 0);
  rayDirection = normalize(rayDirection);
  rayDirection *= camera.rotationMatrix;
  Ray ray;
  ray.direction = rayDirection;
  ray.position = camera.position;

  return ray;
}