
float bulbDE(vec4 pos) {
  vec3 z = pos.xyz;
  float dr = 1.0;
  float r = 0.0;
  float power = 8.0;
  int iterations = 50;
  float bailout = 2.0;

  for (int i = 0; i < 20; i++) {
    r = length(z);
    if (r > bailout) {
      break;
    }

    //convert to polar
    float theta = acos(z.z / r);
    float phi  = atan(z.y / z.x);
    dr = pow(r, power - 1.0) * power * dr + 1.0;

    //scale and rotate the point
    float zr = pow(r, power);
    theta = theta * power;
    phi = phi * power;
    
    //convert back to cartesian
    z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta));
    z.x += pos.x;
    z.y += pos.y;
    z.z += pos.z;
  }

  return 0.5 * log(r) * r / dr;
}