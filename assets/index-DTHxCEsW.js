(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function se(r){return[(r>>16&255)/255,(r>>8&255)/255,(255&r)/255]}["SCREEN","LINEAR_LIGHT"].reduce((r,e,t)=>Object.assign(r,{[e]:t}),{});function f(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}class oe{constructor(e,t,n,s=!1){const i=this,u=document.location.search.toLowerCase().indexOf("debug=webgl")!==-1;i.canvas=e,i.gl=i.canvas.getContext("webgl",{antialias:!0}),i.meshes=[];const o=i.gl;t&&n&&this.setSize(t,n),i.lastDebugMsg,i.debug=s&&u?function(c){const h=new Date;h-i.lastDebugMsg>1e3&&console.log("---"),console.log(h.toLocaleTimeString()+Array(Math.max(0,32-c.length)).join(" ")+c+": ",...Array.from(arguments).slice(1)),i.lastDebugMsg=h}:()=>{},Object.defineProperties(i,{Material:{enumerable:!1,value:class{constructor(c,h,a={}){const l=this;function g(y,p){const w=o.createShader(y);return o.shaderSource(w,p),o.compileShader(w),o.getShaderParameter(w,o.COMPILE_STATUS)||console.error(o.getShaderInfoLog(w)),i.debug("Material.compileShaderSource",{source:p}),w}function m(y,p){return Object.entries(y).map(([w,v])=>v.getDeclaration(w,p)).join(`
`)}l.uniforms=a,l.uniformInstances=[];const b=`
              precision highp float;
            `;l.vertexSource=`
              ${b}
              attribute vec4 position;
              attribute vec2 uv;
              attribute vec2 uvNorm;
              ${m(i.commonUniforms,"vertex")}
              ${m(a,"vertex")}
              ${c}
            `,l.Source=`
              ${b}
              ${m(i.commonUniforms,"fragment")}
              ${m(a,"fragment")}
              ${h}
            `,l.vertexShader=g(o.VERTEX_SHADER,l.vertexSource),l.fragmentShader=g(o.FRAGMENT_SHADER,l.Source),l.program=o.createProgram(),o.attachShader(l.program,l.vertexShader),o.attachShader(l.program,l.fragmentShader),o.linkProgram(l.program),o.getProgramParameter(l.program,o.LINK_STATUS)||console.error(o.getProgramInfoLog(l.program)),o.useProgram(l.program),l.attachUniforms(void 0,i.commonUniforms),l.attachUniforms(void 0,l.uniforms)}attachUniforms(c,h){const a=this;c===void 0?Object.entries(h).forEach(([l,g])=>{a.attachUniforms(l,g)}):h.type=="array"?h.value.forEach((l,g)=>a.attachUniforms(`${c}[${g}]`,l)):h.type=="struct"?Object.entries(h.value).forEach(([l,g])=>a.attachUniforms(`${c}.${l}`,g)):(i.debug("Material.attachUniforms",{name:c,uniform:h}),a.uniformInstances.push({uniform:h,location:o.getUniformLocation(a.program,c)}))}}},Uniform:{enumerable:!1,value:class{constructor(c){this.type="float",Object.assign(this,c),this.typeFn={float:"1f",int:"1i",vec2:"2fv",vec3:"3fv",vec4:"4fv",mat4:"Matrix4fv"}[this.type]||"1f",this.update()}update(c){this.value!==void 0&&o[`uniform${this.typeFn}`](c,this.typeFn.indexOf("Matrix")===0?this.transpose:this.value,this.typeFn.indexOf("Matrix")===0?this.value:null)}getDeclaration(c,h,a){const l=this;if(l.excludeFrom!==h){if(l.type==="array")return l.value[0].getDeclaration(c,h,l.value.length)+`
const int ${c}_length = ${l.value.length};`;if(l.type==="struct"){let g=c.replace("u_","");return g=g.charAt(0).toUpperCase()+g.slice(1),`uniform struct ${g} 
                                  {
`+Object.entries(l.value).map(([m,b])=>b.getDeclaration(m,h).replace(/^uniform/,"")).join("")+`
} ${c}${a>0?`[${a}]`:""};`}return`uniform ${l.type} ${c}${a>0?`[${a}]`:""};`}}}},PlaneGeometry:{enumerable:!1,value:class{constructor(c,h,a,l,g){o.createBuffer(),this.attributes={position:new i.Attribute({target:o.ARRAY_BUFFER,size:3}),uv:new i.Attribute({target:o.ARRAY_BUFFER,size:2}),uvNorm:new i.Attribute({target:o.ARRAY_BUFFER,size:2}),index:new i.Attribute({target:o.ELEMENT_ARRAY_BUFFER,size:3,type:o.UNSIGNED_SHORT})},this.setTopology(a,l),this.setSize(c,h,g)}setTopology(c=1,h=1){const a=this;a.xSegCount=c,a.ySegCount=h,a.vertexCount=(a.xSegCount+1)*(a.ySegCount+1),a.quadCount=a.xSegCount*a.ySegCount*2,a.attributes.uv.values=new Float32Array(2*a.vertexCount),a.attributes.uvNorm.values=new Float32Array(2*a.vertexCount),a.attributes.index.values=new Uint16Array(3*a.quadCount);for(let l=0;l<=a.ySegCount;l++)for(let g=0;g<=a.xSegCount;g++){const m=l*(a.xSegCount+1)+g;if(a.attributes.uv.values[2*m]=g/a.xSegCount,a.attributes.uv.values[2*m+1]=1-l/a.ySegCount,a.attributes.uvNorm.values[2*m]=g/a.xSegCount*2-1,a.attributes.uvNorm.values[2*m+1]=1-l/a.ySegCount*2,g<a.xSegCount&&l<a.ySegCount){const b=l*a.xSegCount+g;a.attributes.index.values[6*b]=m,a.attributes.index.values[6*b+1]=m+1+a.xSegCount,a.attributes.index.values[6*b+2]=m+1,a.attributes.index.values[6*b+3]=m+1,a.attributes.index.values[6*b+4]=m+1+a.xSegCount,a.attributes.index.values[6*b+5]=m+2+a.xSegCount}}a.attributes.uv.update(),a.attributes.uvNorm.update(),a.attributes.index.update(),i.debug("Geometry.setTopology",{uv:a.attributes.uv,uvNorm:a.attributes.uvNorm,index:a.attributes.index})}setSize(c=1,h=1,a="xz"){const l=this;l.width=c,l.height=h,l.orientation=a,l.attributes.position.values&&l.attributes.position.values.length===3*l.vertexCount||(l.attributes.position.values=new Float32Array(3*l.vertexCount));const g=c/-2,m=h/-2,b=c/l.xSegCount,y=h/l.ySegCount;for(let p=0;p<=l.ySegCount;p++){const w=m+p*y;for(let v=0;v<=l.xSegCount;v++){const _=g+v*b,M=p*(l.xSegCount+1)+v;l.attributes.position.values[3*M+"xyz".indexOf(a[0])]=_,l.attributes.position.values[3*M+"xyz".indexOf(a[1])]=-w}}l.attributes.position.update(),i.debug("Geometry.setSize",{position:l.attributes.position})}}},Mesh:{enumerable:!1,value:class{constructor(c,h){const a=this;a.geometry=c,a.material=h,a.wireframe=!1,a.attributeInstances=[],Object.entries(a.geometry.attributes).forEach(([l,g])=>{a.attributeInstances.push({attribute:g,location:g.attach(l,a.material.program)})}),i.meshes.push(a),i.debug("Mesh.constructor",{mesh:a})}draw(){o.useProgram(this.material.program),this.material.uniformInstances.forEach(({uniform:c,location:h})=>c.update(h)),this.attributeInstances.forEach(({attribute:c,location:h})=>c.use(h)),o.drawElements(this.wireframe?o.LINES:o.TRIANGLES,this.geometry.attributes.index.values.length,o.UNSIGNED_SHORT,0)}remove(){i.meshes=i.meshes.filter(c=>c!=this)}}},Attribute:{enumerable:!1,value:class{constructor(c){this.type=o.FLOAT,this.normalized=!1,this.buffer=o.createBuffer(),Object.assign(this,c),this.update()}update(){this.values!==void 0&&(o.bindBuffer(this.target,this.buffer),o.bufferData(this.target,this.values,o.STATIC_DRAW))}attach(c,h){const a=o.getAttribLocation(h,c);return this.target===o.ARRAY_BUFFER&&(o.enableVertexAttribArray(a),o.vertexAttribPointer(a,this.size,this.type,this.normalized,0,0)),a}use(c){o.bindBuffer(this.target,this.buffer),this.target===o.ARRAY_BUFFER&&(o.enableVertexAttribArray(c),o.vertexAttribPointer(c,this.size,this.type,this.normalized,0,0))}}}});const d=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];i.commonUniforms={projectionMatrix:new i.Uniform({type:"mat4",value:d}),modelViewMatrix:new i.Uniform({type:"mat4",value:d}),resolution:new i.Uniform({type:"vec2",value:[1,1]}),aspectRatio:new i.Uniform({type:"float",value:1})}}setSize(e=640,t=480){this.width=e,this.height=t,this.canvas.width=e,this.canvas.height=t,this.gl.viewport(0,0,e,t),this.commonUniforms.resolution.value=[e,t],this.commonUniforms.aspectRatio.value=e/t,this.debug("MiniGL.setSize",{width:e,height:t})}setOrthographicCamera(e=0,t=0,n=0,s=-2e3,i=2e3){this.commonUniforms.projectionMatrix.value=[2/this.width,0,0,0,0,2/this.height,0,0,0,0,2/(s-i),0,e,t,n,1],this.debug("setOrthographicCamera",this.commonUniforms.projectionMatrix.value)}render(){this.gl.clearColor(0,0,0,0),this.gl.clearDepth(1),this.meshes.forEach(e=>e.draw())}}class ae{constructor(...e){f(this,"el",void 0),f(this,"cssVarRetries",0),f(this,"maxCssVarRetries",200),f(this,"angle",0),f(this,"isLoadedClass",!1),f(this,"isScrolling",!1),f(this,"scrollingTimeout",void 0),f(this,"scrollingRefreshDelay",200),f(this,"isIntersecting",!1),f(this,"shaderFiles",void 0),f(this,"vertexShader",void 0),f(this,"sectionColors",void 0),f(this,"computedCanvasStyle",void 0),f(this,"conf",void 0),f(this,"uniforms",void 0),f(this,"t",1253106),f(this,"last",0),f(this,"width",void 0),f(this,"minWidth",1111),f(this,"height",600),f(this,"xSegCount",void 0),f(this,"ySegCount",void 0),f(this,"mesh",void 0),f(this,"material",void 0),f(this,"geometry",void 0),f(this,"minigl",void 0),f(this,"scrollObserver",void 0),f(this,"amp",320),f(this,"seed",5),f(this,"freqX",14e-5*1.5),f(this,"freqY",29e-5*1.5),f(this,"freqDelta",1e-5),f(this,"activeColors",[1,1,1,1]),f(this,"isMetaKey",!1),f(this,"isGradientLegendVisible",!1),f(this,"isMouseDown",!1),f(this,"handleScroll",()=>{clearTimeout(this.scrollingTimeout),this.scrollingTimeout=setTimeout(this.handleScrollEnd,this.scrollingRefreshDelay),this.isGradientLegendVisible&&this.hideGradientLegend(),this.conf.playing&&(this.isScrolling=!0,this.pause())}),f(this,"handleScrollEnd",()=>{this.isScrolling=!1,this.isIntersecting&&this.play()}),f(this,"resize",()=>{this.width=window.innerWidth,this.minigl.setSize(this.width,this.height),this.minigl.setOrthographicCamera(),this.xSegCount=Math.ceil(this.width*this.conf.density[0]),this.ySegCount=Math.ceil(this.height*this.conf.density[1]),this.mesh.geometry.setTopology(this.xSegCount,this.ySegCount),this.mesh.geometry.setSize(this.width,this.height),this.mesh.material.uniforms.u_shadow_power.value=this.width<600?5:6}),f(this,"handleMouseDown",t=>{this.isGradientLegendVisible&&(this.isMetaKey=t.metaKey,this.isMouseDown=!0,this.conf.playing===!1&&requestAnimationFrame(this.animate))}),f(this,"handleMouseUp",()=>{this.isMouseDown=!1}),f(this,"animate",t=>{if(!this.shouldSkipFrame(t)||this.isMouseDown){if(this.t+=Math.min(t-this.last,1e3/15),this.last=t,this.isMouseDown){let n=160;this.isMetaKey&&(n=-160),this.t+=n}this.mesh.material.uniforms.u_time.value=this.t,this.minigl.render()}if(this.last!==0&&this.isStatic)return this.minigl.render(),void this.disconnect();(this.conf.playing||this.isMouseDown)&&requestAnimationFrame(this.animate)}),f(this,"addIsLoadedClass",()=>{!this.isLoadedClass&&(this.isLoadedClass=!0,this.el.classList.add("isLoaded"),setTimeout(()=>{this.el.parentElement.classList.add("isLoaded")},3e3))}),f(this,"pause",()=>{this.conf.playing=!1}),f(this,"play",()=>{requestAnimationFrame(this.animate),this.conf.playing=!0}),f(this,"initGradient",t=>(this.el=document.querySelector(t),this.connect(),this))}async connect(){this.shaderFiles={vertex:`varying vec3 v_color;

void main() {
  float time = u_time * u_global.noiseSpeed;

  vec2 noiseCoord = resolution * uvNorm * u_global.noiseFreq;

  vec2 st = 1. - uvNorm.xy;

  //
  // Tilting the plane
  //

  // Front-to-back tilt
  float tilt = resolution.y / 2.0 * uvNorm.y;

  // Left-to-right angle
  float incline = resolution.x * uvNorm.x / 2.0 * u_vertDeform.incline;

  // Up-down shift to offset incline
  float offset = resolution.x / 2.0 * u_vertDeform.incline * mix(u_vertDeform.offsetBottom, u_vertDeform.offsetTop, uv.y);

  //
  // Vertex noise
  //

  float noise = snoise(vec3(
    noiseCoord.x * u_vertDeform.noiseFreq.x + time * u_vertDeform.noiseFlow,
    noiseCoord.y * u_vertDeform.noiseFreq.y,
    time * u_vertDeform.noiseSpeed + u_vertDeform.noiseSeed
  )) * u_vertDeform.noiseAmp;

  // Fade noise to zero at edges
  noise *= 1.0 - pow(abs(uvNorm.y), 2.0);

  // Clamp to 0
  noise = max(0.0, noise);

  vec3 pos = vec3(
    position.x,
    position.y + tilt + incline + noise - offset,
    position.z
  );

  //
  // Vertex color, to be passed to fragment shader
  //

  if (u_active_colors[0] == 1.) {
    v_color = u_baseColor;
  }

  for (int i = 0; i < u_waveLayers_length; i++) {
    if (u_active_colors[i + 1] == 1.) {
      WaveLayers layer = u_waveLayers[i];

      float noise = smoothstep(
        layer.noiseFloor,
        layer.noiseCeil,
        snoise(vec3(
          noiseCoord.x * layer.noiseFreq.x + time * layer.noiseFlow,
          noiseCoord.y * layer.noiseFreq.y,
          time * layer.noiseSpeed + layer.noiseSeed
        )) / 2.0 + 0.5
      );

      v_color = blendNormal(v_color, layer.color, pow(noise, 4.));
    }
  }

  //
  // Finish
  //

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`,noise:`//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}`,blend:`//
// https://github.com/jamieowen/glsl-blend
//

// Normal

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

// Screen

float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

// Multiply

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// Overlay

float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}

// Hard light

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Soft light

float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Color dodge

float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Color burn

float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Vivid Light

float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}

// Lighten

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear burn

float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear dodge

float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}

// Linear light

float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}`,fragment:`varying vec3 v_color;

void main() {
  vec3 color = v_color;
  if (u_darken_top == 1.0) {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    color.g -= pow(st.y + sin(-12.0) * st.x, u_shadow_power) * 0.4;
  }
  gl_FragColor = vec4(color, 1.0);
}`},this.conf={presetName:"",wireframe:!1,density:[.06,.16],zoom:1,rotation:0,playing:!0},document.querySelectorAll("canvas").length<1?console.log("DID NOT LOAD CANVAS"):(this.minigl=new oe(this.el,null,null,!0),requestAnimationFrame(()=>{this.el&&(this.computedCanvasStyle=getComputedStyle(this.el),this.waitForCssVars())}))}disconnect(){this.scrollObserver&&(window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("mousedown",this.handleMouseDown),window.removeEventListener("mouseup",this.handleMouseUp),window.removeEventListener("keydown",this.handleKeyDown),this.scrollObserver.disconnect()),window.removeEventListener("resize",this.resize)}initMaterial(){this.speed=this.computedCanvasStyle.getPropertyValue("--gradient-speed"),this.uniforms={u_time:new this.minigl.Uniform({value:0}),u_shadow_power:new this.minigl.Uniform({value:5}),u_darken_top:new this.minigl.Uniform({value:this.el.dataset.jsDarkenTop===""?1:0}),u_active_colors:new this.minigl.Uniform({value:this.activeColors,type:"vec4"}),u_global:new this.minigl.Uniform({value:{noiseFreq:new this.minigl.Uniform({value:[this.freqX,this.freqY],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:this.speed})},type:"struct"}),u_vertDeform:new this.minigl.Uniform({value:{incline:new this.minigl.Uniform({value:Math.sin(this.angle)/Math.cos(this.angle)}),offsetTop:new this.minigl.Uniform({value:-.5}),offsetBottom:new this.minigl.Uniform({value:-.5}),noiseFreq:new this.minigl.Uniform({value:[3,4],type:"vec2"}),noiseAmp:new this.minigl.Uniform({value:this.amp}),noiseSpeed:new this.minigl.Uniform({value:10}),noiseFlow:new this.minigl.Uniform({value:3}),noiseSeed:new this.minigl.Uniform({value:this.seed})},type:"struct",excludeFrom:"fragment"}),u_baseColor:new this.minigl.Uniform({value:this.sectionColors[0],type:"vec3",excludeFrom:"fragment"}),u_waveLayers:new this.minigl.Uniform({value:[],excludeFrom:"fragment",type:"array"})};for(let e=1;e<this.sectionColors.length;e+=1)this.uniforms.u_waveLayers.value.push(new this.minigl.Uniform({value:{color:new this.minigl.Uniform({value:this.sectionColors[e],type:"vec3"}),noiseFreq:new this.minigl.Uniform({value:[2+e/this.sectionColors.length,3+e/this.sectionColors.length],type:"vec2"}),noiseSpeed:new this.minigl.Uniform({value:11+.3*e}),noiseFlow:new this.minigl.Uniform({value:6.5+.3*e}),noiseSeed:new this.minigl.Uniform({value:this.seed+10*e}),noiseFloor:new this.minigl.Uniform({value:.1}),noiseCeil:new this.minigl.Uniform({value:.63+.07*e})},type:"struct"}));return this.vertexShader=[this.shaderFiles.noise,this.shaderFiles.blend,this.shaderFiles.vertex].join(`

`),new this.minigl.Material(this.vertexShader,this.shaderFiles.fragment,this.uniforms)}initMesh(){this.material=this.initMaterial(),this.geometry=new this.minigl.PlaneGeometry,this.mesh=new this.minigl.Mesh(this.geometry,this.material)}shouldSkipFrame(e){return!!window.document.hidden||!this.conf.playing||parseInt(e,10)%2==0||void 0}updateFrequency(e){this.freqX+=e,this.freqY+=e}toggleColor(e){this.activeColors[e]=this.activeColors[e]===0?1:0}showGradientLegend(){this.width>this.minWidth&&(this.isGradientLegendVisible=!0,document.body.classList.add("isGradientLegendVisible"))}hideGradientLegend(){this.isGradientLegendVisible=!1,document.body.classList.remove("isGradientLegendVisible")}init(){this.initGradientColors(),this.initMesh(),this.resize(),requestAnimationFrame(this.animate),window.addEventListener("resize",this.resize)}waitForCssVars(){if(this.computedCanvasStyle&&this.computedCanvasStyle.getPropertyValue("--gradient-color-1").indexOf("#")!==-1)this.init(),this.addIsLoadedClass();else{if(this.cssVarRetries+=1,this.cssVarRetries>this.maxCssVarRetries)return this.sectionColors=[16711680,16711680,16711935,65280,255],void this.init();requestAnimationFrame(()=>this.waitForCssVars())}}initGradientColors(){this.sectionColors=["--gradient-color-1","--gradient-color-2","--gradient-color-3","--gradient-color-4"].map(e=>{let t=this.computedCanvasStyle.getPropertyValue(e).trim();return t.length===4&&(t=`#${t.substr(1).split("").map(s=>s+s).join("")}`),t&&`0x${t.substr(1)}`}).filter(Boolean).map(se)}}class le{constructor(e,t){this.pixels=e,this.opts=t;const{sigBits:n}=t,s=(_,M,x)=>(_<<2*n)+(M<<n)+x;this.getColorIndex=s;const i=8-n,u=1<<3*n,o=new Uint32Array(u);let d,c,h,a,l,g,m,b,y,p;d=h=l=0,c=a=g=Number.MAX_VALUE;const w=e.length/4;let v=0;for(;v<w;){const _=v*4;if(v++,m=e[_+0],b=e[_+1],y=e[_+2],p=e[_+3],p===0)continue;m=m>>i,b=b>>i,y=y>>i;const M=s(m,b,y);o[M]===void 0&&(o[M]=0),o[M]+=1,m>d&&(d=m),m<c&&(c=m),b>h&&(h=b),b<a&&(a=b),y>l&&(l=y),y<g&&(g=y)}this._colorCount=o.reduce((_,M)=>M>0?_+1:_,0),this.hist=o,this.rmax=d,this.rmin=c,this.gmax=h,this.gmin=a,this.bmax=l,this.bmin=g}get colorCount(){return this._colorCount}}class ce{scaleDown(e){const t=this.getWidth(),n=this.getHeight();let s=1;if(e.maxDimension>0){const i=Math.max(t,n);i>e.maxDimension&&(s=e.maxDimension/i)}else s=1/e.quality;s<1&&this.resize(t*s,n*s,s)}}function ue(r,e){var t;if(e.length>0){const n=r.data,s=n.length/4;let i,u,o,d,c;for(let h=0;h<s;h++){i=h*4,u=n[i+0],o=n[i+1],d=n[i+2],c=n[i+3];for(let a=0;a<e.length;a++)if(!((t=e[a])!=null&&t.call(e,u,o,d,c))){n[i+3]=0;break}}}return r}function he(r){const e=new URL(r,location.href);return e.protocol===location.protocol&&e.host===location.host&&e.port===location.port}function de(r,e){const t=new URL(r),n=new URL(e);return t.protocol===n.protocol&&t.hostname===n.hostname&&t.port===n.port}class me extends ce{_getCanvas(){if(!this._canvas)throw new Error("Canvas is not initialized");return this._canvas}_getContext(){if(!this._context)throw new Error("Context is not initialized");return this._context}_getWidth(){if(!this._width)throw new Error("Width is not initialized");return this._width}_getHeight(){if(!this._height)throw new Error("Height is not initialized");return this._height}_initCanvas(){const e=this.image;if(!e)throw new Error("Image is not initialized");const t=this._canvas=document.createElement("canvas"),n=t.getContext("2d");if(!n)throw new ReferenceError("Failed to create canvas context");this._context=n,t.className="@vibrant/canvas",t.style.display="none",this._width=t.width=e.width,this._height=t.height=e.height,n.drawImage(e,0,0),document.body.appendChild(t)}load(e){let t,n;if(typeof e=="string")t=document.createElement("img"),n=e,!he(n)&&!de(window.location.href,n)&&(t.crossOrigin="anonymous"),t.src=n;else if(e instanceof HTMLImageElement)t=e,n=e.src;else return Promise.reject(new Error("Cannot load buffer as an image in browser"));return this.image=t,new Promise((s,i)=>{const u=()=>{this._initCanvas(),s(this)};t.complete?u():(t.onload=u,t.onerror=o=>i(new Error(`Fail to load image: ${n}`)))})}clear(){this._getContext().clearRect(0,0,this._getWidth(),this._getHeight())}update(e){this._getContext().putImageData(e,0,0)}getWidth(){return this._getWidth()}getHeight(){return this._getHeight()}resize(e,t,n){if(!this.image)throw new Error("Image is not initialized");this._width=this._getCanvas().width=e,this._height=this._getCanvas().height=t,this._getContext().scale(n,n),this._getContext().drawImage(this.image,0,0)}getPixelCount(){return this._getWidth()*this._getHeight()}getImageData(){return this._getContext().getImageData(0,0,this._getWidth(),this._getHeight())}remove(){this._canvas&&this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas)}}function F(r,...e){return e.forEach(t=>{if(t){for(const n in t)if(t.hasOwnProperty(n)){const s=t[n];Array.isArray(s)?r[n]=s.slice(0):typeof s=="object"?(r[n]||(r[n]={}),F(r[n],s)):r[n]=s}}}),r}function ge(r,e){const{colorCount:t,quantizer:n,generators:s,filters:i}=r,u={colorCount:t},o=typeof n=="string"?{name:n,options:{}}:n;return o.options=F({},u,o.options),F({},{quantizer:o,generators:s,filters:i},e)}class be{constructor(e,t={}){this._src=e,this._opts=F({},E.DefaultOpts,t)}maxColorCount(e){return this._opts.colorCount=e,this}maxDimension(e){return this._opts.maxDimension=e,this}addFilter(e){return this._opts.filters?this._opts.filters.push(e):this._opts.filters=[e],this}removeFilter(e){if(this._opts.filters){const t=this._opts.filters.indexOf(e);t>0&&this._opts.filters.splice(t)}return this}clearFilters(){return this._opts.filters=[],this}quality(e){return this._opts.quality=e,this}useImageClass(e){return this._opts.ImageClass=e,this}useGenerator(e,t){return this._opts.generators||(this._opts.generators=[]),this._opts.generators.push(t?{name:e,options:t}:e),this}useQuantizer(e,t){return this._opts.quantizer=t?{name:e,options:t}:e,this}build(){return new E(this._src,this._opts)}getPalette(){return this.build().getPalette()}}class k{constructor(e){this.pipeline=e,this._map={}}names(){return Object.keys(this._map)}has(e){return!!this._map[e]}get(e){return this._map[e]}register(e,t){return this._map[e]=t,this.pipeline}}class fe{constructor(){this.filter=new k(this),this.quantizer=new k(this),this.generator=new k(this)}_buildProcessTasks({filters:e,quantizer:t,generators:n}){return n.length===1&&n[0]==="*"&&(n=this.generator.names()),{filters:e.map(i=>s(this.filter,i)),quantizer:s(this.quantizer,t),generators:n.map(i=>s(this.generator,i))};function s(i,u){let o,d;return typeof u=="string"?o=u:(o=u.name,d=u.options),{name:o,fn:i.get(o),options:d}}}async process(e,t){const{filters:n,quantizer:s,generators:i}=this._buildProcessTasks(t),u=await this._filterColors(n,e),o=await this._generateColors(s,u),d=await this._generatePalettes(i,o);return{colors:o,palettes:d}}_filterColors(e,t){return Promise.resolve(ue(t,e.map(({fn:n})=>n)))}_generateColors(e,t){return Promise.resolve(e.fn(t.data,e.options))}async _generatePalettes(e,t){const n=await Promise.all(e.map(({fn:s,options:i})=>Promise.resolve(s(t,i))));return Promise.resolve(n.reduce((s,i,u)=>(s[e[u].name]=i,s),{}))}}function ve(r,e,t){return"#"+((1<<24)+(r<<16)+(e<<8)+t).toString(16).slice(1,7)}function ye(r,e,t){r/=255,e/=255,t/=255;const n=Math.max(r,e,t),s=Math.min(r,e,t);let i=0,u=0;const o=(n+s)/2;if(n!==s){const d=n-s;switch(u=o>.5?d/(2-n-s):d/(n+s),n){case r:i=(e-t)/d+(e<t?6:0);break;case e:i=(t-r)/d+2;break;case t:i=(r-e)/d+4;break}i/=6}return[i,u,o]}function A(r,e,t){let n,s,i;function u(o,d,c){return c<0&&(c+=1),c>1&&(c-=1),c<1/6?o+(d-o)*6*c:c<1/2?d:c<2/3?o+(d-o)*(2/3-c)*6:o}if(e===0)n=s=i=t;else{const o=t<.5?t*(1+e):t+e-t*e,d=2*t-o;n=u(d,o,r+1/3),s=u(d,o,r),i=u(d,o,r-1/3)}return[n*255,s*255,i*255]}class D{static applyFilters(e,t){return t.length>0?e.filter(({r:n,g:s,b:i})=>{var u;for(let o=0;o<t.length;o++)if(!((u=t[o])!=null&&u.call(t,n,s,i,255)))return!1;return!0}):e}static clone(e){return new D(e._rgb,e._population)}get r(){return this._rgb[0]}get g(){return this._rgb[1]}get b(){return this._rgb[2]}get rgb(){return this._rgb}get hsl(){if(!this._hsl){const[e,t,n]=this._rgb;this._hsl=ye(e,t,n)}return this._hsl}get hex(){if(!this._hex){const[e,t,n]=this._rgb;this._hex=ve(e,t,n)}return this._hex}get population(){return this._population}toJSON(){return{rgb:this.rgb,population:this.population}}getYiq(){if(!this._yiq){const e=this._rgb;this._yiq=(e[0]*299+e[1]*587+e[2]*114)/1e3}return this._yiq}get titleTextColor(){return this._titleTextColor||(this._titleTextColor=this.getYiq()<200?"#fff":"#000"),this._titleTextColor}get bodyTextColor(){return this._bodyTextColor||(this._bodyTextColor=this.getYiq()<150?"#fff":"#000"),this._bodyTextColor}constructor(e,t){this._rgb=e,this._population=t}}const Z=class R{constructor(e,t){this._src=e,this.opts=F({},R.DefaultOpts,t)}static use(e){this._pipeline=e}static from(e){return new be(e)}get result(){return this._result}_process(e,t){e.scaleDown(this.opts);const n=ge(this.opts,t);return R._pipeline.process(e.getImageData(),n)}async getPalette(){const e=new this.opts.ImageClass;try{const t=await e.load(this._src),n=await this._process(t,{generators:["default"]});this._result=n;const s=n.palettes.default;if(!s)throw new Error("Something went wrong and a palette was not found, please file a bug against our GitHub repo: https://github.com/vibrant-Colors/node-vibrant/");return e.remove(),s}catch(t){return e.remove(),Promise.reject(t)}}async getPalettes(){const e=new this.opts.ImageClass;try{const t=await e.load(this._src),n=await this._process(t,{generators:["*"]});this._result=n;const s=n.palettes;return e.remove(),s}catch(t){return e.remove(),Promise.reject(t)}}};Z.DefaultOpts={colorCount:64,quality:5,filters:[]};let E=Z;E.DefaultOpts.quantizer="mmcq";E.DefaultOpts.generators=["default"];E.DefaultOpts.filters=["default"];E.DefaultOpts.ImageClass=me;const $=5,N=8-$;class O{constructor(e,t,n,s,i,u,o){this.histogram=o,this._volume=-1,this._avg=null,this._count=-1,this.dimension={r1:e,r2:t,g1:n,g2:s,b1:i,b2:u}}static build(e){const t=new le(e,{sigBits:$}),{rmin:n,rmax:s,gmin:i,gmax:u,bmin:o,bmax:d}=t;return new O(n,s,i,u,o,d,t)}invalidate(){this._volume=this._count=-1,this._avg=null}volume(){if(this._volume<0){const{r1:e,r2:t,g1:n,g2:s,b1:i,b2:u}=this.dimension;this._volume=(t-e+1)*(s-n+1)*(u-i+1)}return this._volume}count(){if(this._count<0){const{hist:e,getColorIndex:t}=this.histogram,{r1:n,r2:s,g1:i,g2:u,b1:o,b2:d}=this.dimension;let c=0;for(let h=n;h<=s;h++)for(let a=i;a<=u;a++)for(let l=o;l<=d;l++){const g=t(h,a,l);e[g]&&(c+=e[g])}this._count=c}return this._count}clone(){const{histogram:e}=this,{r1:t,r2:n,g1:s,g2:i,b1:u,b2:o}=this.dimension;return new O(t,n,s,i,u,o,e)}avg(){if(!this._avg){const{hist:e,getColorIndex:t}=this.histogram,{r1:n,r2:s,g1:i,g2:u,b1:o,b2:d}=this.dimension;let c=0;const h=1<<8-$;let a,l,g;a=l=g=0;for(let m=n;m<=s;m++)for(let b=i;b<=u;b++)for(let y=o;y<=d;y++){const p=t(m,b,y),w=e[p];w&&(c+=w,a+=w*(m+.5)*h,l+=w*(b+.5)*h,g+=w*(y+.5)*h)}c?this._avg=[~~(a/c),~~(l/c),~~(g/c)]:this._avg=[~~(h*(n+s+1)/2),~~(h*(i+u+1)/2),~~(h*(o+d+1)/2)]}return this._avg}contains(e){let[t,n,s]=e;const{r1:i,r2:u,g1:o,g2:d,b1:c,b2:h}=this.dimension;return t>>=N,n>>=N,s>>=N,t>=i&&t<=u&&n>=o&&n<=d&&s>=c&&s<=h}split(){const{hist:e,getColorIndex:t}=this.histogram,{r1:n,r2:s,g1:i,g2:u,b1:o,b2:d}=this.dimension,c=this.count();if(!c)return[];if(c===1)return[this.clone()];const h=s-n+1,a=u-i+1,l=d-o+1,g=Math.max(h,a,l);let m=null,b,y;b=y=0;let p=null;if(g===h){p="r",m=new Uint32Array(s+1);for(let x=n;x<=s;x++){b=0;for(let C=i;C<=u;C++)for(let L=o;L<=d;L++){const V=t(x,C,L);e[V]&&(b+=e[V])}y+=b,m[x]=y}}else if(g===a){p="g",m=new Uint32Array(u+1);for(let x=i;x<=u;x++){b=0;for(let C=n;C<=s;C++)for(let L=o;L<=d;L++){const V=t(C,x,L);e[V]&&(b+=e[V])}y+=b,m[x]=y}}else{p="b",m=new Uint32Array(d+1);for(let x=o;x<=d;x++){b=0;for(let C=n;C<=s;C++)for(let L=i;L<=u;L++){const V=t(C,L,x);e[V]&&(b+=e[V])}y+=b,m[x]=y}}let w=-1;const v=new Uint32Array(m.length);for(let x=0;x<m.length;x++){const C=m[x];C&&(w<0&&C>y/2&&(w=x),v[x]=y-C)}const _=this;function M(x){const C=x+"1",L=x+"2",V=_.dimension[C];let S=_.dimension[L];const G=_.clone(),j=_.clone(),H=w-V,W=S-w;for(H<=W?(S=Math.min(S-1,~~(w+W/2)),S=Math.max(0,S)):(S=Math.max(V,~~(w-1-H/2)),S=Math.min(_.dimension[L],S));!m[S];)S++;let Y=v[S];for(;!Y&&m[S-1];)Y=v[--S];return G.dimension[L]=S,j.dimension[C]=S+1,[G,j]}return M(p)}}class X{_sort(){this._sorted||(this.contents.sort(this._comparator),this._sorted=!0)}constructor(e){this._comparator=e,this.contents=[],this._sorted=!1}push(e){this.contents.push(e),this._sorted=!1}peek(e){return this._sort(),e=typeof e=="number"?e:this.contents.length-1,this.contents[e]}pop(){return this._sort(),this.contents.pop()}size(){return this.contents.length}map(e){return this._sort(),this.contents.map(e)}}const pe=.75;function K(r,e){let t=r.size();for(;r.size()<e;){const n=r.pop();if(n&&n.count()>0){const[s,i]=n.split();if(!s||(r.push(s),i&&i.count()>0&&r.push(i),r.size()===t))break;t=r.size()}else break}}const xe=(r,e)=>{if(r.length===0||e.colorCount<2||e.colorCount>256)throw new Error("Wrong MMCQ parameters");const t=O.build(r);t.histogram.colorCount;const n=new X((i,u)=>i.count()-u.count());n.push(t),K(n,pe*e.colorCount);const s=new X((i,u)=>i.count()*i.volume()-u.count()*u.volume());return s.contents=n.contents,K(s,e.colorCount-s.size()),we(s)};function we(r){const e=[];for(;r.size();){const t=r.pop(),n=t.avg();e.push(new D(n,t.count()))}return e}const _e={targetDarkLuma:.26,maxDarkLuma:.45,minLightLuma:.55,targetLightLuma:.74,minNormalLuma:.3,targetNormalLuma:.5,maxNormalLuma:.7,targetMutesSaturation:.3,maxMutesSaturation:.4,targetVibrantSaturation:1,minVibrantSaturation:.35,weightSaturation:3,weightLuma:6.5,weightPopulation:.5};function Ce(r){let e=0;return r.forEach(t=>{e=Math.max(e,t.population)}),e}function Le(r,e){return r.Vibrant===e||r.DarkVibrant===e||r.LightVibrant===e||r.Muted===e||r.DarkMuted===e||r.LightMuted===e}function Se(r,e,t,n,s,i,u){function o(...c){let h=0,a=0;for(let l=0;l<c.length;l+=2){const g=c[l],m=c[l+1];!g||!m||(h+=g*m,a+=m)}return h/a}function d(c,h){return 1-Math.abs(c-h)}return o(d(r,e),u.weightSaturation,d(t,n),u.weightLuma,s/i,u.weightPopulation)}function z(r,e,t,n,s,i,u,o,d,c){let h=null,a=0;return e.forEach(l=>{const[,g,m]=l.hsl;if(g>=o&&g<=d&&m>=s&&m<=i&&!Le(r,l)){const b=Se(g,u,m,n,l.population,t,c);(h===null||b>a)&&(h=l,a=b)}}),h}function Me(r,e,t){const n={Vibrant:null,DarkVibrant:null,LightVibrant:null,Muted:null,DarkMuted:null,LightMuted:null};return n.Vibrant=z(n,r,e,t.targetNormalLuma,t.minNormalLuma,t.maxNormalLuma,t.targetVibrantSaturation,t.minVibrantSaturation,1,t),n.LightVibrant=z(n,r,e,t.targetLightLuma,t.minLightLuma,1,t.targetVibrantSaturation,t.minVibrantSaturation,1,t),n.DarkVibrant=z(n,r,e,t.targetDarkLuma,0,t.maxDarkLuma,t.targetVibrantSaturation,t.minVibrantSaturation,1,t),n.Muted=z(n,r,e,t.targetNormalLuma,t.minNormalLuma,t.maxNormalLuma,t.targetMutesSaturation,0,t.maxMutesSaturation,t),n.LightMuted=z(n,r,e,t.targetLightLuma,t.minLightLuma,1,t.targetMutesSaturation,0,t.maxMutesSaturation,t),n.DarkMuted=z(n,r,e,t.targetDarkLuma,0,t.maxDarkLuma,t.targetMutesSaturation,0,t.maxMutesSaturation,t),n}function De(r,e,t){if(!r.Vibrant&&!r.DarkVibrant&&!r.LightVibrant){if(!r.DarkVibrant&&r.DarkMuted){let[n,s,i]=r.DarkMuted.hsl;i=t.targetDarkLuma,r.DarkVibrant=new D(A(n,s,i),0)}if(!r.LightVibrant&&r.LightMuted){let[n,s,i]=r.LightMuted.hsl;i=t.targetDarkLuma,r.DarkVibrant=new D(A(n,s,i),0)}}if(!r.Vibrant&&r.DarkVibrant){let[n,s,i]=r.DarkVibrant.hsl;i=t.targetNormalLuma,r.Vibrant=new D(A(n,s,i),0)}else if(!r.Vibrant&&r.LightVibrant){let[n,s,i]=r.LightVibrant.hsl;i=t.targetNormalLuma,r.Vibrant=new D(A(n,s,i),0)}if(!r.DarkVibrant&&r.Vibrant){let[n,s,i]=r.Vibrant.hsl;i=t.targetDarkLuma,r.DarkVibrant=new D(A(n,s,i),0)}if(!r.LightVibrant&&r.Vibrant){let[n,s,i]=r.Vibrant.hsl;i=t.targetLightLuma,r.LightVibrant=new D(A(n,s,i),0)}if(!r.Muted&&r.Vibrant){let[n,s,i]=r.Vibrant.hsl;i=t.targetMutesSaturation,r.Muted=new D(A(n,s,i),0)}if(!r.DarkMuted&&r.DarkVibrant){let[n,s,i]=r.DarkVibrant.hsl;i=t.targetMutesSaturation,r.DarkMuted=new D(A(n,s,i),0)}if(!r.LightMuted&&r.LightVibrant){let[n,s,i]=r.LightVibrant.hsl;i=t.targetMutesSaturation,r.LightMuted=new D(A(n,s,i),0)}}const Ve=(r,e)=>{e=Object.assign({},_e,e);const t=Ce(r),n=Me(r,t,e);return De(n,t,e),n},Ae=new fe().filter.register("default",(r,e,t,n)=>n>=125&&!(r>250&&e>250&&t>250)).quantizer.register("mmcq",xe).generator.register("default",Ve);E.use(Ae);const Ee=window.location.search,I=new URLSearchParams(Ee),q=I.get("client_id")||"",ee=I.get("client_secret")||"";let Ie=I.get("refresh_token")||"",te="";const B=I.get("duration")||0,ze=I.has("hide_album_art"),Te=I.has("hide_times"),Ue=I.get("text_scroll")||"ease-in-out";let ne=!1,Q="";const Fe=/(?:featuring|with|feat\.?)\s+(.*)/i;var P=new ae;async function ie(){let r=`grant_type=refresh_token&refresh_token=${Ie}&client_id=${q}`;const e=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{Authorization:`Basic ${btoa(q+":"+ee)}`,"Content-Type":"application/x-www-form-urlencoded"},body:r});e.ok&&(te=(await e.json()).access_token)}async function Be(){try{const r=await fetch("https://api.spotify.com/v1/me/player/currently-playing",{method:"GET",headers:{Authorization:`Bearer ${te}`,"Content-Type":"application/json"}});if(r.ok){const e=await r.json();Oe(e)}else r.status===401&&await ie()}catch{T(!1)}}function Oe(r){var e=r.is_playing,t=r.item.uri,n=`${r.item.duration_ms/1e3}`,s=`${r.progress_ms/1e3}`;e!=ne&&(e?setTimeout(()=>{P.play(),T(!0),i.classList.add("animate"),B>0&&setTimeout(()=>{T(!1,!1)},B*1e3)},500):(T(!1),setTimeout(()=>{i.classList.remove("animate"),i.style.transform="translateX(0)",P.pause()},500)));var i=document.getElementById("topInfo");if(t!=Q&&e){setTimeout(()=>{T(!0),B>0&&setTimeout(()=>{T(!1,!1)},B*1e3)},500),Q=t,i.classList.remove("animate"),i.style.transform="translateX(0)";var u=r.item.name,o,d=u.match(Fe);if(d){let v=d[1].toLowerCase();var c=[r.item.artists[0].name];if(r.item.artists.length>1)for(const _ of r.item.artists.slice(1))v.includes(_.name.toLowerCase())||c.push(_.name);o=c.join(", ")}else o=r.item.artists.map(v=>v.name).join(", ");if(r.item.is_local){let v=r.item.name.split(" - ");u=v[0],o=v[1]}var h=r.item.album.images.length>0?`${r.item.album.images[0].url}`:"./src/images/album-art-placeholder.png";qe(document.getElementById("albumArt"),h),E.from(h).getPalette().then(function(v){document.getElementById("progressBar").style.backgroundColor=re(v.Vibrant.hex)<=.02?U(v.Vibrant.hex,20):v.Vibrant.hex,document.getElementById("progressBg").style.backgroundColor=Re(v.Vibrant.hex),document.getElementById("progressTime").style.color=v.LightVibrant.hex,document.getElementById("endTime").style.color=v.LightVibrant.hex,document.getElementById("dotSeparator").style.color=v.Muted.hex,document.getElementById("songLabel").style.color=v.LightVibrant.hex,document.getElementById("artistLabel").style.color=v.LightMuted.hex,P.initGradient("#gradient-canvas");const _=document.querySelector("#gradient-canvas"),M={"--gradient-color-1":`${v.DarkMuted.hex}`,"--gradient-color-2":`${U(v.Vibrant.hex,-10)}`,"--gradient-color-3":`${U(v.LightVibrant.hex,-10)}`,"--gradient-color-4":`${U(v.DarkMuted.hex,-5)}`,"--gradient-speed":"0.000009"};for(const[x,C]of Object.entries(M))_.style.setProperty(x,C)}),ke(u),Ne(o)}if(i.scrollWidth>i.clientWidth){i.classList.add("animate");var a=i.scrollWidth-i.clientWidth,l=Math.round(i.scrollWidth/500),g=l<1?10:(l-1)*5+10,m=20-(l-1)*5>5?20-(l-1)*5:5,b=80+(l-1)*5<95?80+(l-1)*5:95;const v=document.getElementById("scroll-style")||document.createElement("style");v.id="scroll-style",v.textContent=`
      @keyframes scroll-alternate {
        0% { transform: translateX(0); }
        ${m}% { transform: translateX(0); }
        ${b}% { transform: translateX(var(--scroll-distance)); }
        100% { transform: translateX(var(--scroll-distance)); }
      }

      .animate {
        --scroll-distance: -${a}px;
        animation: scroll-alternate ${g}s infinite alternate ${Ue};
      }
    `,document.head.appendChild(v)}const y=s/n*100,p=J(s),w=J(n);document.getElementById("progressBar").style.width=`${y}%`,document.getElementById("progressTime").innerHTML=p,document.getElementById("endTime").innerHTML=`${w}`}function ke(r){const e=document.getElementById("songLabel");e.innerHTML="",[...r].forEach((t,n)=>{const s=document.createElement("span");s.className="letterSong",s.style.animationDelay=`${n*.05}s`,s.textContent=t===" "?" ":t,e.appendChild(s)})}function Ne(r){const e=document.getElementById("artistLabel");e.innerHTML="";const t=[...r],n=t.length;t.forEach((s,i)=>{const u=document.createElement("span");u.className="letterArtist",u.style.animationDelay=`${(n-i-1)*.05}s`,u.textContent=s===" "?" ":s,e.appendChild(u)})}function Pe(r){var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(r);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}function Re(r,e=.01,t=-5){let n=r;for(;re(n)>e;)n=U(n,t);return n}function re(r){return Math.floor($e(...Pe(r))*100)/100}function $e(r,e,t){var n=r/255,s=e/255,i=t/255,u=n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4),o=s<=.03928?s/12.92:Math.pow((s+.055)/1.055,2.4),d=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4),c=.2126*u+.7152*o+.0722*d;return c}function U(r,e){e=Math.max(-100,Math.min(100,e));function t(i){i=i.replace(/^#/,"");let u=parseInt(i.substring(0,2),16)/255,o=parseInt(i.substring(2,4),16)/255,d=parseInt(i.substring(4,6),16)/255;const c=Math.max(u,o,d),h=Math.min(u,o,d);let a,l,g=(c+h)/2;if(c===h)a=l=0;else{const m=c-h;switch(l=g>.5?m/(2-c-h):m/(c+h),c){case u:a=(o-d)/m+(o<d?6:0);break;case o:a=(d-u)/m+2;break;case d:a=(u-o)/m+4;break}a/=6}return{h:a*360,s:l*100,l:g*100}}function n(i,u,o){i/=360,u/=100,o/=100;let d,c,h;if(u===0)d=c=h=o;else{const l=(b,y,p)=>(p<0&&(p+=1),p>1&&(p-=1),p<.16666666666666666?b+(y-b)*6*p:p<.5?y:p<.6666666666666666?b+(y-b)*(.6666666666666666-p)*6:b),g=o<.5?o*(1+u):o+u-o*u,m=2*o-g;d=l(m,g,i+1/3),c=l(m,g,i),h=l(m,g,i-1/3)}const a=l=>{const g=Math.round(l*255).toString(16);return g.length===1?"0"+g:g};return`#${a(d)}${a(c)}${a(h)}`}const s=t(r);return s.l=Math.max(0,Math.min(100,s.l+e)),n(s.h,s.s,s.l)}function qe(r,e){r.src!=e&&(r.setAttribute("class","text-fade"),setTimeout(()=>{r.src=e,r.setAttribute("class","text-show")},500))}function J(r){const e=Math.floor(r/60),t=Math.trunc(r-e*60);return`${e}:${("0"+t).slice(-2)}`}function T(r,e=!0){const t=document.getElementById("mainContainer");r?(t.style.opacity=1,t.style.bottom="50%"):(t.style.opacity=0,t.style.bottom="calc(50% - 20px)"),e&&(ne=r)}ze&&(document.getElementById("albumArtBox").style.display="none");Te&&(document.getElementById("progressTime").style.display="none",document.getElementById("endTime").style.display="none",document.getElementById("topInfo").style.marginBottom="20px");q!=""&ee!=""&&(ie(),setInterval(()=>{Be()},1e3));
