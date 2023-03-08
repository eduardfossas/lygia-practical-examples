// Copyright Patricio Gonzalez Vivo, 2022 - http://patriciogonzalezvivo.com/

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D   u_doubleBuffer0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#include "lygia/generative/random.glsl"
#include "lygia/draw/fill.glsl"
#include "lygia/simulate/grayscott.glsl"

void main() {
    vec3 color = vec3(0.0);
    vec2 pixel = 1. / u_resolution;
    vec2 st = gl_FragCoord.xy * pixel;

#ifdef DOUBLE_BUFFER_0
    color = grayscott(u_doubleBuffer0, st, pixel, fill(1., random(st), 0.01));

#else
    color = texture2D(u_doubleBuffer0, st * 0.4).ggg;
    
#endif

    gl_FragColor = vec4(color, 1.0);
}
