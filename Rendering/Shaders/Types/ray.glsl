struct Ray {
  vec4 position;
  vec4 direction;
};



Ray marchRay(Ray ray, float distance) {
  Ray result = ray;
  result.position += ray.direction * distance;
  return result;
}