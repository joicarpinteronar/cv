'use strict';

//Point
var pointLightPosition = [0, 5, 0];

//Puntos de la curva
var startP = [-10, 0, 0];
var endP = [10, 0, -25];
var c1P = [-10, 0, -15];
var c2P = [-10, 0, -15];

var t = 0; //Tiempo animación actual
var animacion = 5000; //Tiempo de animacion
var tiempo = Date.now(); //Tiempo actual
var regreso = false; //Animacion de regreso
  
// Clases del grafo de escena
var Node = function() {
  this.children = [];
  this.localMatrix = m4.identity();
  this.worldMatrix = m4.identity();
};

Node.prototype.setParent = function(parent) {
  if (this.parent) {
    var ndx = this.parent.children.indexOf(this);
    if (ndx >= 0) {
      this.parent.children.splice(ndx, 1);
    }
  }

  if (parent) {
    parent.children.push(this);
  }
  this.parent = parent;
};

Node.prototype.updateWorldMatrix = function(parentWorldMatrix) {
  if (parentWorldMatrix) {
    // a matrix was passed in so do the math
    m4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
  } else {
    // no matrix was passed in so just copy local to world
    m4.copy(this.localMatrix, this.worldMatrix);
  }
  
  // now process all the children
  var worldMatrix = this.worldMatrix;
  this.children.forEach(function(child) {
    child.updateWorldMatrix(worldMatrix);
  });
};

// Main
function main() {
  var canvas = document.getElementById('scene');
  var gl = canvas.getContext('webgl');
  if (!gl) return;
  
  var programInfo = webglUtils.createProgramInfo(gl, [
    '3d-vertex-shader',
    '3d-fragment-shader'
  ]);
  
  var shadowMapProgramInfo = webglUtils.createProgramInfo(gl, [
    'shadowMap-vs',
    'shadowMap-fs'
  ]);
  // Fucniones utiles
  function degToRad(d) {
    return d * Math.PI / 180;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function emod(x, n) {
    return x >= 0 ? x % n : (n + x % n) % n;
  }
  
  // Interpolacion lineal entre vectores
  function lerp(a, b, t) {
    var len = a.length;
    if(b.length != len) return;

    var x = [];
    for(var i = 0; i < len; i++)
        x.push(a[i] + t * (b[i] - a[i]));
    return x;
  }
  
  function bezier(a, b, p1, p2, t) {
    var ap = lerp(a, p1, t);
    var pp = lerp(p1, p2, t);
    var pb = lerp(p2, b, t);
    
    var app = lerp(ap, pp, t);
    var ppb = lerp(pp, pb, t);
    
    return {
      position: lerp(app, ppb, t),
      lookAt: ppb
    };
  }
  
  //Creación de primitivas
  var wallGeometry = primitives.deindexVertices(primitives.createPlaneVertices(100, 100));
  var geometry = primitives.deindexVertices(primitives.createCubeVertices(2));
  var sphere = primitives.deindexVertices(primitives.createSphereVertices(0.5, 10, 10));
  var foco = primitives.deindexVertices(primitives.createTruncatedConeVertices(1, 2, 3, 5, 5));
  
  const wallBufferInfo = webglUtils.createBufferInfoFromArrays(gl, wallGeometry);
  const cubeBufferInfo = webglUtils.createBufferInfoFromArrays(gl, geometry);
  const sphereBufferInfo = webglUtils.createBufferInfoFromArrays(gl, sphere);

  //Creación de objetos
  var objectsToDraw = [];
  var objects = [];


  var root = new Node();
  root.localMatrix = m4.translation(0, 0, 0);
  root.drawInfo = {
    uniforms: {
      u_colorOffset: [0.0, 0.0, 0.0, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var point = new Node();
  point.localMatrix = m4.translation(pointLightPosition[0], pointLightPosition[1], pointLightPosition[2]);
  point.drawInfo = {
    uniforms: {
      u_colorOffset: [1, 1, 1, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: sphereBufferInfo,
  };
  
  var cubeA1 = new Node();
  cubeA1.localMatrix = m4.translation(-3, 7, -3);
  cubeA1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.96, 0.72, 0.04, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeB1 = new Node();
  cubeB1.localMatrix = m4.translation(-3, 5, -1);
  cubeB1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.90, 0.42, 0.07, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeB2 = new Node();
  cubeB2.localMatrix = m4.translation(-1, 5, -3);
  cubeB2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.90, 0.42, 0.07, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeC1 = new Node();
  cubeC1.localMatrix = m4.translation(-3, 3, 1);
  cubeC1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.85, 0.18, 0.10, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeC2 = new Node();
  cubeC2.localMatrix = m4.translation(-1, 3, -1);
  cubeC2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.85, 0.18, 0.10, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeC3 = new Node();
  cubeC3.localMatrix = m4.translation(1, 3, -3);
  cubeC3.drawInfo = {
    uniforms: {
      u_colorOffset: [0.85, 0.18, 0.10, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeD1 = new Node();
  cubeD1.localMatrix = m4.translation(-3, 1, 3);
  cubeD1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.80, 0.12, 0.26, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeD2 = new Node();
  cubeD2.localMatrix = m4.translation(-1, 1, 1);
  cubeD2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.80, 0.12, 0.26, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeD3 = new Node();
  cubeD3.localMatrix = m4.translation(1, 1, -1);
  cubeD3.drawInfo = {
    uniforms: {
      u_colorOffset: [0.80, 0.12, 0.26, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeD4 = new Node();
  cubeD4.localMatrix = m4.translation(3, 1, -3);
  cubeD4.drawInfo = {
    uniforms: {
      u_colorOffset: [0.80, 0.12, 0.26, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeE1 = new Node();
  cubeE1.localMatrix = m4.translation(-3, -1, 5);
  cubeE1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.74, 0.14, 0.46, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeE2 = new Node();
  cubeE2.localMatrix = m4.translation(-1, -1, 3);
  cubeE2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.74, 0.14, 0.46, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeE3 = new Node();
  cubeE3.localMatrix = m4.translation(1, -1, 1);
  cubeE3.drawInfo = {
    uniforms: {
      u_colorOffset: [0.74, 0.14, 0.46, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeE4 = new Node();
  cubeE4.localMatrix = m4.translation(3, -1, -1);
  cubeE4.drawInfo = {
    uniforms: {
      u_colorOffset: [0.74, 0.14, 0.46, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeE5 = new Node();
  cubeE5.localMatrix = m4.translation(5, -1, -3);
  cubeE5.drawInfo = {
    uniforms: {
      u_colorOffset: [0.74, 0.14, 0.46, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF1 = new Node();
  cubeF1.localMatrix = m4.translation(-3, -3, 7);
  cubeF1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF2 = new Node();
  cubeF2.localMatrix = m4.translation(-1, -3, 5);
  cubeF2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF3 = new Node();
  cubeF3.localMatrix = m4.translation(1, -3, 3);
  cubeF3.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF4 = new Node();
  cubeF4.localMatrix = m4.translation(3, -3, 1);
  cubeF4.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF5 = new Node();
  cubeF5.localMatrix = m4.translation(5, -3, -1);
  cubeF5.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeF6 = new Node();
  cubeF6.localMatrix = m4.translation(7, -3, -3);
  cubeF6.drawInfo = {
    uniforms: {
      u_colorOffset: [0.69, 0.15, 0.61, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG1 = new Node();
  cubeG1.localMatrix = m4.translation(-3, -5, 9);
  cubeG1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG2 = new Node();
  cubeG2.localMatrix = m4.translation(-1, -5, 7);
  cubeG2.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG3 = new Node();
  cubeG3.localMatrix = m4.translation(1, -5, 5);
  cubeG3.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG4 = new Node();
  cubeG4.localMatrix = m4.translation(3, -5, 3);
  cubeG4.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG5 = new Node();
  cubeG5.localMatrix = m4.translation(5, -5, 1);
  cubeG5.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG6 = new Node();
  cubeG6.localMatrix = m4.translation(7, -5, -1);
  cubeG6.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var cubeG7 = new Node();
  cubeG7.localMatrix = m4.translation(9, -5, -3);
  cubeG7.drawInfo = {
    uniforms: {
      u_colorOffset: [0.56, 0.16, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: cubeBufferInfo
  };
  
  var wall1Matrix = m4.translation(0, 0, -30);
  m4.xRotate(wall1Matrix, degToRad(90), wall1Matrix);
  var wall1 = new Node();
  wall1.localMatrix = wall1Matrix;
  wall1.drawInfo = {
    uniforms: {
      u_colorOffset: [0.42, 0.86, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: wallBufferInfo
  };
  
  
  var wall2Matrix = m4.translation(-25, 0, 0);
  m4.zRotate(wall2Matrix, degToRad(-90), wall2Matrix);
  var wall2 = new Node();
  wall2.localMatrix = wall2Matrix;
  wall2.drawInfo = {
    uniforms: {
    u_colorOffset: [0.42, 0.86, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: wallBufferInfo
  };
  
  var floor = new Node();
  floor.localMatrix = m4.translation(0, -10, 0);
  floor.drawInfo = {
    uniforms: {
      u_colorOffset: [0.42, 0.86, 0.64, 1], 
      u_colorMult: [0, 0, 0, 1]
    },
    programInfo: programInfo,
    bufferInfo: wallBufferInfo
  };
  

  // Creación del grafo
  cubeA1.setParent(root);
  cubeB1.setParent(root);
  cubeB2.setParent(root);
  cubeC1.setParent(root);
  cubeC2.setParent(root);
  cubeC3.setParent(root);
  cubeD1.setParent(root);
  cubeD2.setParent(root);
  cubeD3.setParent(root);
  cubeD4.setParent(root);
  cubeE1.setParent(root);
  cubeE2.setParent(root);
  cubeE3.setParent(root);
  cubeE4.setParent(root);
  cubeE5.setParent(root);
  cubeF1.setParent(root);
  cubeF2.setParent(root);
  cubeF3.setParent(root);
  cubeF4.setParent(root);
  cubeF5.setParent(root);
  cubeF6.setParent(root);
  cubeG1.setParent(root);
  cubeG2.setParent(root);
  cubeG3.setParent(root);
  cubeG4.setParent(root);
  cubeG5.setParent(root);
  cubeG6.setParent(root);
  cubeG7.setParent(root);
  wall1.setParent(floor);
  wall2.setParent(floor);
  
  objects = [
    //point,
    cubeA1,
    cubeB1, 
    cubeB2,
    cubeC1, 
    cubeC2, 
    cubeC3,
    cubeD1, 
    cubeD2, 
    cubeD3, 
    cubeD4,
    cubeE1, 
    cubeE2, 
    cubeE3, 
    cubeE4, 
    cubeE5,
    cubeF1, 
    cubeF2, 
    cubeF3, 
    cubeF4, 
    cubeF5, 
    cubeF6,
    cubeG1, 
    cubeG2, 
    cubeG3, 
    cubeG4, 
    cubeG5, 
    cubeG6, 
    cubeG7,
    floor,
    wall1,
    wall2
  ];

  objectsToDraw = [];
  objects.forEach(o => objectsToDraw.push(o.drawInfo));
  
  // ------ Generar ShadowMap -------

  var shadowMapCube = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_CUBE_MAP, shadowMapCube);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  var floatExtension = gl.getExtension("OES_texture_float");
  var floatLinearExtension = gl.getExtension("OES_texture_float_linear");
  var textureSize = 512;
  if (floatExtension && floatLinearExtension) {
    for (var i = 0; i < 6; i++) {
      gl.texImage2D(
        gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
        0, gl.RGBA,
        textureSize, textureSize,
        0, gl.RGBA,
        gl.FLOAT, null
      );

    }
  } else {
    for (var i = 0; i < 6; i++) {
      gl.texImage2D(
        gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
        0, gl.RGBA,
        textureSize, textureSize,
        0, gl.RGBA,
        gl.UNSIGNED_BYTE, null
      );
    }
  }

  var shadowMapFramebuffer =gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, shadowMapFramebuffer);

  var shadowMapRenderbuffer = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, shadowMapRenderbuffer);
  gl.renderbufferStorage(
    gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
    textureSize, textureSize
  );

  gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  
  //Camaras para el shadow map
  var shadowCameras = [];
  var shadowAspect = 1.0;
  var shadowFieldOfViewRadians = degToRad(90);
  var nearFar = [1, 1000];
  var projectionMatrix = m4.perspective(shadowFieldOfViewRadians, shadowAspect, nearFar[0], nearFar[1]);
  for (var i = 0; i< 6; i++) {
     var position = pointLightPosition;
     var target = m4.addVectors(pointLightPosition, [1, 0, 0]);
     var up = [0, 1, 0];
     switch (i) {
       case 1:
         target = m4.addVectors(pointLightPosition, [-1, 0, 0]);
         break;
       case 2:
         target = m4.addVectors(pointLightPosition, [0, 1, 0]);
         up = [0, 0, 1];
         break;
       case 3:
         target = m4.addVectors(pointLightPosition, [0, -1, 0]);
         up = [0, 0, -1];
         break;
       case 4:
         target = m4.addVectors(pointLightPosition, [0, 0, 1]);
         break;
       case 5:
         target = m4.addVectors(pointLightPosition, [0, 0, -1]);
         break;         
     }
     var cameraMatrix = m4.lookAt(position, target, up);
     var viewMatrix = m4.inverse(cameraMatrix);
     var camera = {
       world: cameraMatrix,
       view: viewMatrix,
       proj: projectionMatrix
     };
     shadowCameras.push(camera);   
  }
  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time) {
    time *= 0.0005;
    
    //Movimiento por la curva #ANI
    var tActual = Date.now();
    var delta = tActual - tiempo;
    tiempo = tActual;
    t+= delta;
    if (t>animacion) {
      t = 0;
      regreso = !regreso;
    }
    var interpolacion = t/animacion;
    if(regreso) {
      interpolacion = 1 - interpolacion;
    }
    var bezierInfo = bezier(startP, endP, c1P, c2P, interpolacion);
    
    m4.lookAt(bezierInfo.position, bezierInfo.lookAt, [0,1,0], root.localMatrix);
    root.updateWorldMatrix();
    floor.updateWorldMatrix();
    point.updateWorldMatrix();
    
    //Generar shadow map
    gl.useProgram(shadowMapProgramInfo.program);
	  gl.bindTexture(gl.TEXTURE_CUBE_MAP, shadowMapCube);
	  gl.bindFramebuffer(gl.FRAMEBUFFER, shadowMapFramebuffer);
	  gl.bindRenderbuffer(gl.RENDERBUFFER, shadowMapRenderbuffer);

	  gl.viewport(0, 0, textureSize, textureSize);

    gl.clearColor(0, 0, 0, 1);
	  gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    
    for (var i = 0; i < shadowCameras.length; i++) {
    
        for(var k = 0; k<objects.length; k++) {
          objects[i].drawInfo.uniforms.mWorld = objects[i].worldMatrix;
          objects[i].drawInfo.uniforms.mView = shadowCameras[i].view;
          objects[i].drawInfo.uniforms.mProj = shadowCameras[i].proj;
          objects[i].drawInfo.uniforms.pointLightPosition = pointLightPosition;
        }
        // Set framebuffer destination
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
          shadowMapCube,
          0
        );
        gl.framebufferRenderbuffer(
          gl.FRAMEBUFFER,
          gl.DEPTH_ATTACHMENT,
          gl.RENDERBUFFER,
          shadowMapRenderbuffer
        );

        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        objectsToDraw.forEach(object => {
          
          var bufferInfo = object.bufferInfo;

          webglUtils.setBuffersAndAttributes(gl, shadowMapProgramInfo, bufferInfo);
          webglUtils.setUniforms(shadowMapProgramInfo, object.uniforms);

          gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);  

        });
    }
	  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
    
    // ------ Draw the objects --------
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // Clear the canvas AND the depth buffer.
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    
    var cameraMatrix = m4.identity();    
    var cameraPosition = [7.5, 15, 15];
    var target = [0, 5, 0];
    var up = [0, 1, 0];
    cameraMatrix = m4.lookAt(cameraPosition, target, up);
    
    // Make a view matrix from the camera matrix.
    var viewMatrix = m4.inverse(cameraMatrix);
    
    // Compute the projection matrix
    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var fieldOfViewRadians = degToRad(70);
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
   
    // Compute all the matrices for rendering
    for(var i = 0; i<objects.length; i++) {
      objects[i].drawInfo.uniforms.mWorld = objects[i].worldMatrix;
      objects[i].drawInfo.uniforms.mView = viewMatrix;
      objects[i].drawInfo.uniforms.mProj = projectionMatrix;
      objects[i].drawInfo.uniforms.meshColor = objects[i].drawInfo.uniforms.u_colorOffset;
      //Posicion de la luz de punto
      objects[i].drawInfo.uniforms.pointLightPosition = pointLightPosition;
      objects[i].drawInfo.uniforms.lightShadowMap = shadowMapCube;
    }
    var lastUsedProgramInfo = null;
    var lastUsedBufferInfo = null;

    objectsToDraw.forEach(object => {
      var programInfo = object.programInfo;
      var bufferInfo = object.bufferInfo;
      var bindBuffers = false;

      if (programInfo !== lastUsedProgramInfo) {
        lastUsedProgramInfo = programInfo;
        gl.useProgram(programInfo.program);

        bindBuffers = true;
      }
      
      // Setup all the needed attributes.
      if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
        lastUsedBufferInfo = bufferInfo;
        webglUtils.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      }
      
      // Set the uniforms.
      webglUtils.setUniforms(programInfo, object.uniforms);

      gl.drawArrays(gl.TRIANGLES, 0, bufferInfo.numElements);  
      
    });
    requestAnimationFrame(drawScene);
  }
}

main();
