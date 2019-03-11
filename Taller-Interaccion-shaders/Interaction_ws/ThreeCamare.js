var rotationSpeed = 0.1;
var cubeRotation2 = -0.1;
var figureWallDistance = 2;
var orthogonal = false;
const longShotPos = [0,0,0];
const longShotDir = [0,6,-30];

var translationXLeft = [-5,0,0];
var translationXRight = [5,0,0];
var translationZFront = [0,0,5];
var translationZBack = [0,0,-5];
var translationYDown = [0,-4,0];
var translationYUp = [0,4,0];
var translationYDown2 = [0,-7,0];

rootPosition = [0.0, 6.0, -30.0];
rootRotation =  [0.0, 1.0, 0.0];

const  LINES          = 0x0001;
const  LINE_LOOP      = 0x0002;
const  LINE_STRIP     = 0x0003;
const  TRIANGLES      = 0x0004;
const  TRIANGLE_STRIP = 0x0005;
const  TRIANGLE_FAN   = 0x0006;

var cameraType = "1stPerson";
var perspectiveType = "perspective";
var figureSelected = "pyramidGreys";

$(document).ready(
  
  function()
		{		$("input[name^=camera]").click(function ()  {	
        cameraType = $('input:radio[name=camera_view]:checked').val();
        perspectiveType = $('input:radio[name=camera_perspective]:checked').val();
        figureSelected = $('input:radio[name=camera_figure]:checked').val();
			  //alert( figureSelected + "-" + perspectiveType);			 
			}   );
		 }
);


const cubeUniforms = {
  
  vertices: 
  [
    

   -1.0, -1.0,  1.0,     1.0,  1.0,  0.0,  1.0,   
     1.0, -1.0,  1.0,    0.0,  1.0,  1.0,  1.0,   
     1.0,  1.0,  1.0,    0.0,  0.0,  1.0,  1.0,   
    -1.0,  1.0,  1.0,    0.0,  0.0,  1.0,  1.0,   

    // Back face
    -1.0, -1.0, -1.0,     1.0,  0.0,  0.0,  1.0,  
    -1.0,  1.0, -1.0,     1.0,  0.0,  0.0,  1.0,  
     1.0,  1.0, -1.0,     1.0,  0.0,  0.0,  1.0,  
     1.0, -1.0, -1.0,     1.0,  0.0,  0.0,  1.0,  

    // Top face
    -1.0,  1.0, -1.0,    0.0,  1.0,  0.0,  1.0,   
    -1.0,  1.0,  1.0,    0.0,  1.0,  0.0,  1.0,   
     1.0,  1.0,  1.0,    0.0,  1.0,  0.0,  1.0,   
     1.0,  1.0, -1.0,    0.0,  1.0,  0.0,  1.0,   

    // Bottom face
    -1.0, -1.0, -1.0,    0.0,  0.0,  1.0,  1.0,
     1.0, -1.0, -1.0,    0.0,  0.0,  1.0,  1.0,
     1.0, -1.0,  1.0,    0.0,  0.0,  1.0,  1.0,
    -1.0, -1.0,  1.0,    0.0,  0.0,  1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,    1.0,  1.0,  0.0,  1.0,  
     1.0,  1.0, -1.0,    1.0,  1.0,  0.0,  1.0,  
     1.0,  1.0,  1.0,    1.0,  1.0,  0.0,  1.0,  
     1.0, -1.0,  1.0,    1.0,  1.0,  0.0,  1.0,  

    // Left face
    -1.0, -1.0, -1.0,   1.0,  0.0,  1.0,  1.0,   
    -1.0, -1.0,  1.0,   1.0,  0.0,  1.0,  1.0,   
    -1.0,  1.0,  1.0,   1.0,  0.0,  1.0,  1.0,   
    -1.0,  1.0, -1.0,   1.0,  0.0,  1.0,  1.0,           
  ],
  indices: [    
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ],
  indexCount: 36,
  primitiveType: TRIANGLES ,
  
}
const pyramid1Uniforms = {
  
  vertices: 
  [
    
   -1.0, -1.0,  1.0,
    0.0,  1.0,  0.0,  1.0,    
    
    1.0, -1.0,  1.0,
    1.0,  0.0,  0.0,  1.0,   
    
    0.0,  1.0,  0.0,
    0.0,  0.0,  1.0,  1.0,    
    
    1.0, -1.0, -1.0,
    1.0,  1.0,  0.0,  1.0,    
    
   -1.0, -1.0, -1.0,
    1.0,  1.0,  1.0,  1.0,            
  ],
  indices: [    
    0,  1,  2,  
    3,  4,  1,  
    0,  0,     
    4,  2,
  ],
  indexCount: 10,
  primitiveType: TRIANGLE_STRIP ,
  
}
const pyramid2Uniforms = 
      {
  
  vertices: 
  [
    -1.0, -1.0,  1.0,
    0.0,  1.0,  1.0,  1.0,    
    
    1.0, -1.0,  1.0,
    1.0,  1.0,  0.0,  1.0,   
    
    0.0,  1.0,  0.0,
    0.0,  1.0,  0.0,  1.0,    
    
    1.0, -1.0, -1.0,
    1.0,  1.0,  0.0,  1.0,    
    
   -1.0, -1.0, -1.0,
    1.0,  1.0,  1.0,  1.0,            
  ],
   indices: [    
    0,  1,  2,  
    3,  4,  1,  
    0,  0,     
    4,  2,
  ],
  indexCount: 10,
  primitiveType: TRIANGLE_STRIP ,
  }
const pyramid3Uniforms = 
{
  vertices: 
  [
    -1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,    
    
    1.0, -1.0,  1.0,
    1.0,  1.0,  1.0,  1.0,   
    
    0.0,  1.0,  0.0,
    0.0,  0.0,  0.0,  1.0,    
    
    1.0, -1.0, -1.0,
    1.0,  1.0,  1.0,  1.0,    
    
   -1.0, -1.0, -1.0,
    1.0,  1.0,  1.0,  1.0,            
  ],
   indices: [    
    0,  1,  2,  
    3,  4,  1,  
    0,  0,     
    4,  2,
  ],
 indexCount: 10,
  primitiveType: TRIANGLE_STRIP ,
  }

//Tomado de https://juancoivc.tumblr.com/post/170597576648/objeto-sencillo-en-webgl
const cospos = 0.2;
const diamanteUniforms = 
      {
  vertices: 
  [
      0.0, 0.0, 0.5,
      0.8,  0.3,  0.0,  0.5,    // Front face: white
      0.5, 0.0, 0.0,
      0.0,  0.0,  1.0,  0.5,    // Front face: white
      0.0, 1, 0.0,
      0.0,  0.0,  1.0,  0.5,    // Front face: white
      -0.5, 0.0, 0.0,
     0.0,  1.0,  1.0,  0.5,    // Front face: white
    -cospos, -cospos, 0.0,
     0.0,  0.0,  1.0,  0.5,    // Front face: white
    cospos, -cospos, 0.0,
     0.0,  0.0,  1.0,  0.5,    // Front face: white
    0.0, 0.0, -0.5,
    0.0,  0.0,  1.0,  0.5,    // Front face: white
    
  ],
   indices: [    
  0,1,2,
  0,2,3,
  0,3,4,
  0,4,5,
  0,5,1,

  6,1,2,
  6,2,3,
  6,3,4,
  6,4,5,
  6,5,1
  ],
 indexCount: 30,
  primitiveType: TRIANGLE_STRIP ,
  }
//Tomado de http://juleegh.blogspot.es/1517874087/creacion-de-una-estrella-con-webgl-utilizando-un-arreglo-para-las-posiciones-y-los-colores/
const starUniforms = 
      {
  vertices: 
  [
       
     0.0,  0.0,  0.5,    0.0,  1.0,  1.0,  1.0, 
     0.3,  0.3,  0.0,    0.7,  1.0,  1.0,  1.0,
     0.0,  1.0,  0.0,    0.9,  1.0,  1.0,  1.0,
    -0.3,  0.3,  0.0,    0.9,  1.0,  1.0,  1.0,
    -1.0,  0.3,  0.0,    0.0,  0.0,  0.0,  1.0,
    -0.5, -0.2,  0.0,    0.5,  1.0,  1.0,  1.0,
    -0.7, -1.0,  0.0,    0.0,  0.7,  1.0,  1.0,
     0.0, -0.6,  0.0,    0.0,  0.7,  1.0,  1.0,
     0.7, -1.0,  0.0,    0.0,  0.5,  1.0,  1.0,
     0.5, -0.2,  0.0,    0.0,  0.5,  1.0,  1.0, 
     1.0,  0.3,  0.0,    1.0,  0.0,  0.0,  1.0, 
     0.0,  0.0, -0.5,    0.0,  1.0,  1.0,  1.0, 
    
  ],
   indices: [    
    0,  1,  2,    0,  2,  3,
    0,  3,  4,    0,  4,  5,
    0,  5,  6,    0,  6,  7,
    0,  7,  8,    0,  8,  9,
    0,  9,  10,   0, 10,   1,
    
    11,  1,  2,    11,  2,  3,
    11,  3,  4,    11,  4,  5,
    11,  5,  6,    11,  6,  7,
    11,  7,  8,    11,  8,  9,
    11,  9,  10,   11, 10,   1,
  ],
  indexCount: 60,
  primitiveType: TRIANGLE_FAN,
  }
const star2Uniforms = 
      {
  vertices: 
  [
       
     0.0,  0.0,  0.5,    1.0,  1.0,  0.0,  1.0, 
     0.3,  0.3,  0.0,    1.0,  1.0,  0.7,  1.0,
     0.0,  1.0,  0.0,    1.0,  1.0,  0.9,  1.0,
    -0.3,  0.3,  0.0,    1.0,  1.0,  0.9,  1.0,
    -1.0,  0.3,  0.0,    1.0,  1.0,  0.7,  1.0,
    -0.5, -0.2,  0.0,    1.0,  1.0,  0.5,  1.0,
    -0.7, -1.0,  0.0,    1.0,  0.7,  0.0,  1.0,
     0.0, -0.6,  0.0,    1.0,  0.7,  0.0,  1.0,
     0.7, -1.0,  0.0,    1.0,  0.5,  0.0,  1.0,
     0.5, -0.2,  0.0,    1.0,  0.5,  0.0,  1.0, 
     1.0,  0.3,  0.0,    1.0,  0.7,  0.0,  1.0,  
     0.0,  0.0, -0.5,    1.0,  1.0,  0.0,  1.0, 
    
  ],
   indices: [    
    0,  1,  2,    0,  2,  3,
    0,  3,  4,    0,  4,  5,
    0,  5,  6,    0,  6,  7,
    0,  7,  8,    0,  8,  9,
    0,  9,  10,   0, 10,   1,
    
    11,  1,  2,    11,  2,  3,
    11,  3,  4,    11,  4,  5,
    11,  5,  6,    11,  6,  7,
    11,  7,  8,    11,  8,  9,
    11,  9,  10,   11, 10,   1,
  ],
  indexCount: 60,
  primitiveType: TRIANGLE_FAN,
  }

const lineUniforms = {
 
  vertices: 
  [
     -5.0,  1.0,  0.0,
    //matriz1[12], matriz1[13], 20+ matriz1[14], //matriz1.x, matriz1.y, matriz1.z  
    
    0.0,  1.0,  0.0, 
    //matriz2[12], matriz2[13], 20 + matriz2[14],
    
    
    
    5.0,  1.0,  0.0,
    
    0.0,  1.0,  0.0, 
    
    
    
    0.0,  1.0,  5.0,    
    0.0,  1.0,  -5.0, 
    
        
    5.0,  1.0,   0.0, 
    5.0,  -5.0,  0.0, 
    
    
    -5.0,  1.0,   0.0, 
    -5.0,  -8.0,  0.0, 
    
    // -2do piso
    /*5.0,  -3.0,  -5.0,
    5.0,  -3.0,   5.0,
    
     0.0,  -6.0,  0.0, 
    -10.0, -6.0,  0.0, 
    
     -10.0,  -6.0,  0.0, 
     -10.0,  -10.0,  0.0, 
    
     -10.0,   -10.0, -5.0, 
     -10.0,   -10.0,  5.0, */
    /*
    0.0,  -6.0,  0.0, 
     0.0,  -10.0,  0.0, */
    
     
  ],
  indices: [    
    0,  1, 2, 3, 4, 5, 6, 7
                    ,8,9
                  
  ],
  indexCount: 10,
  primitiveType: LINES ,
  
}
const lineUniforms2 = {
 
  vertices: 
  [
    
    // 2do piso
    /*5.0,  -3.0,  -5.0,
    5.0,  -3.0,   5.0,
    */
    
    0.0,  1.0,  5.0,    
    0.0,  1.0,  -5.0, 
    
   
  ],
  indices: [    
    0,  1, 
  ],
  indexCount: 2,
  primitiveType: LINES ,
  
}
const lineUniforms3 = {
 
  vertices: 
  [
    
    
    -5.0,  1.0,  0.0,
    
    0.0,  1.0,  0.0, 
    //matriz2[12], matriz2[13], 20 + matriz2[14],
    
    5.0,  1.0,  0.0,
    
    0.0,  1.0,  0.0, 
    
    -5.0,  1.0,  0.0,    
    -5.0,  -3.0,  0.0, 
    
  ],
  indices: [    
    0,  1,  2, 3,4,5
  ],
  indexCount: 6,
  primitiveType: LINES ,
  
}

main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  // Here's where we call the routine that builds all the
  // objects we'll be drawing.

  var then = 0;

  //drawScene(gl, programInfo,  12);
  
  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    
    drawScene(gl, programInfo, /*buffers,*/ deltaTime);  
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl, data) {

  // Create a buffer for the cube's vertex positions.

  const verticesBuffer = gl.createBuffer();
  

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);

  
  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.



  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(data.indices), gl.STATIC_DRAW);

  return {
    vertices: verticesBuffer,
    //color: colorBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, /*buffers,*/ deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 50 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();
  
  const numComponentsPosition = 3;
  const numComponentsColors = 4;
  const type = gl.FLOAT;
  const sizeFloat = 4;
  const normalize = false;
  // --- vertex Components (Strie and offset mode)
  const positionOffset = 0;
  const colorOffset = numComponentsPosition * sizeFloat;
  const stride  = (numComponentsPosition + numComponentsColors) * sizeFloat; //sizeOfVector
   

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
 
  
  
  
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  var modelViewMatrixOriginal = mat4.create(); //debería ser de cada figura

  var modelViewMatrix2 = mat4.create(); //debería ser de cada figura
  
  // Tell WebGL to use our program when drawing
  gl.useProgram(programInfo.program);
  
 
  // Figura 1 -------------
  
  //to Root Figure
  mat4.translate(modelViewMatrixOriginal,     // destination matrix
                 modelViewMatrixOriginal,     // matrix to translate
                 rootPosition);  // amount to translate, gloabl? local?

  
  mat4.rotate(modelViewMatrixOriginal,  // destination matrix
              modelViewMatrixOriginal,  // matrix to rotate
              rotationSpeed,     // amount to rotate in radians
              rootRotation  );       // axis to rotate around (X)
  
  

  
  var camLocation = vec3.create();
  var figureLookedPos =  vec3.create(); //[5, -4, 0]; //[-5,-7,0]; [5, -4, 0];
  
  
  if(figureSelected == "pyramidColors")
  {
    vec3.add(figureLookedPos, translationXRight, figureLookedPos );
    vec3.add(figureLookedPos, translationYDown, figureLookedPos );
  }
  else if(figureSelected == "pyramidGreys")
  {
    vec3.add(figureLookedPos, translationXLeft, figureLookedPos );
    vec3.add(figureLookedPos, translationYDown2, figureLookedPos );
  }
  
  
  // Set the Camera type

  var camOffset = [];
  var figureOffset = [];
  var up = [0,1,0];

 
  if(cameraType == "1stPerson")
  {
    camOffset = [-1,0,-1]; 
    figureOffset = [-3,0,0];  
    
    
    vec3.add(camLocation, camOffset, figureLookedPos );
  
    vec3.set(camLocation, figureLookedPos[0] + camOffset[0],
                         figureLookedPos[1]+ camOffset[1],
                         figureLookedPos[2]+ camOffset[2], );
    vec3.set(figureLookedPos, figureLookedPos[0] + figureOffset [0],
                               figureLookedPos[1]+ figureOffset [1],
                               figureLookedPos[2]+ figureOffset [2], );
    
    mat4.lookAt(modelViewMatrixOriginal, camLocation, figureLookedPos, up);
  } 
  else if (cameraType == "3rdPerson")
  {
    
    camOffset = [0,0,4];  

    vec3.add(camLocation, camOffset, figureLookedPos );
    mat4.lookAt(modelViewMatrixOriginal, camLocation, figureLookedPos, up);

  }
  else //if (cameraType == "longShot")
  {
        
    //mat4.lookAt(modelViewMatrixOriginal, camLocation, figureLookedPos, up);
    
  }
   
   
  
  
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrixOriginal);
  
  var buffers = initBuffers(gl, pyramid1Uniforms);
  
    {
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponentsPosition,
        type,
        normalize,
        stride,
        positionOffset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
       
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponentsColors,
        type,
        normalize,
        stride,
        colorOffset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
    
  }
  

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  

  {
    const vertexCount = 10;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLE_STRIP, vertexCount, type, offset);
  }
  
  // - Orthogonal or Perspective
  
  if(perspectiveType == "perspective")
  {
          mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
  }
  else if(perspectiveType == "orthogonal")
  {
    
    if (cameraType == "longShot")
    {
      mat4.ortho(projectionMatrix,
                 -20,18, //Left Right
                 -10,12, //Top Bottom
                 zNear,
                 zFar);
    }
    else
    {
      mat4.ortho(projectionMatrix,
                 -5,5,  /* posX +- traslacionX */
                 -5,2,
                 -6,10,  /* posZ +- traslacionZ */);
    }
    

  }
  
  
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  
  // --- All Objects  ---------------------
  

  
  //var translation4 = [0,-4,0];
  
  var rotation1 = [0,1,0];
  var rotation2 = [0,2,0];
  var rotation3 = [0,3,0];
  //var rotationSpeed2 = 0.3;  
  //var rotationSpeed3 = 0.2;
  
 //drawFigure(gl, programInfo, projectionMatrix, modelViewMatrix, pyramid1Uniforms.translation, pyramid1Uniforms.rotation, pyramid1Uniforms);
  
  //the green one, left
  var matriz2 = drawFigure(gl, programInfo,  modelViewMatrixOriginal, translationXLeft, rootRotation, pyramid2Uniforms);
  
  //aplica sobre dicha ModelVew Matrix
 var matriz3 = drawFigure(gl, programInfo,  modelViewMatrixOriginal, translationXRight, rootRotation, pyramid2Uniforms);
  
  
   // white, back
                drawFigure(gl, programInfo,  modelViewMatrixOriginal, translationZFront, rotation3, cubeUniforms, true);
  
   // white, front
               drawFigure(gl, programInfo,  modelViewMatrixOriginal, translationZBack, rootRotation, cubeUniforms);
   
  
  var matriz6 = drawFigure(gl, programInfo,  matriz3, translationYDown, rotation2, pyramid1Uniforms);
  
  
                drawFigure(gl, programInfo,  matriz6, translationZBack, rotation2, star2Uniforms);
  
                drawFigure(gl, programInfo,  matriz6, translationZFront, rotation2, star2Uniforms);
  
   var matriz9 = drawFigure(gl, programInfo,  matriz2, translationYDown2, rotation2, pyramid3Uniforms);
  
   var matriz10  = drawFigure(gl, programInfo,  matriz9, translationXLeft, rotation2, starUniforms);
  
   var matriz11 = drawFigure(gl, programInfo,  matriz9, translationXRight, rotation2, starUniforms);
  
    var matriz12 = drawFigure(gl, programInfo,  matriz10, translationYDown, rotation2, pyramid3Uniforms);
  
                   drawFigure(gl, programInfo,  matriz12, translationZFront, rotation2, diamanteUniforms);
  
                   drawFigure(gl, programInfo,  matriz12, translationZBack, rotation2, diamanteUniforms);
  
  drawLine(gl, programInfo,  modelViewMatrixOriginal, translationZBack, rotation2, lineUniforms );
  
  drawLine(gl, programInfo,  matriz6, translationZBack, rotation2, lineUniforms2 );
  
  drawLine(gl, programInfo,  matriz9, translationZBack, rotation3, lineUniforms3 );
  
  drawLine(gl, programInfo,  matriz12, translationZBack, rotation3, lineUniforms2 );
  
  
  // - Camera translations
  
  
  
  
  /*mat4.translate(projectionMatrix,     // destination matrix
                 projectionMatrix,     // matrix to translate
                 [0, - 6.0 , 26 ]);  // amount to translate
    */             

  
  
                 
  
  
  
  
  /*mat4.rotate(projectionMatrix,  // destination matrix
              projectionMatrix,   // matrix to rotate
              rotationSpeed ,     // amount to rotate in radians
              [0.0, 0.0 , 0.0] );       // axis to rotate around (X)
           
           */
  
  /*mat4.translate(projectionMatrix,     // destination matrix
                 projectionMatrix,     // matrix to translate
                [5 + 3 ,0,0]);  // amount to translate*/
    
   
  // Update the rotation for the next draw
  rotationSpeed += deltaTime;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


function drawFigure(gl, programInfo,  modelViewMatrixLastStack, translation, rotation, figureData, posCamera)
{
  
  var modelViewMatrixFigure = mat4.create();
  
    //var modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrixFigure,     // destination matrix
                 modelViewMatrixLastStack,     // matrix to translate
                  translation); ;  // amount to translate = translate
  mat4.rotate(modelViewMatrixFigure,  // destination matrix
              modelViewMatrixFigure,  // matrix to rotate
              rotationSpeed,     // amount added to rotate in radians*/
              rotation );     
  
 /* gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);*/
  //if(posCamera)  {
  /*var position = [0, -6, -25];
  var looking = [7, 6, 7];
  var position = [3, 0, 3 ];
  //var looking = [0, 6, -30];
  var up =  [0 , 1, 0 ];
  
  mat4.lookAt(modelViewMatrixFigure, position , looking, up);
  mat4.translate(modelViewMatrixFigure,     // destination matrix
                 modelViewMatrixLastStack,     // matrix to translate
                  translation); ;  // amount to translate = translate
  mat4.rotate(modelViewMatrixFigure, modelViewMatrixFigure, rotationSpeed, [0,5,0]); //ese vector si que sirve pa un
  }*/
  
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrixFigure);
  
  
  
  var bufferFigure = initBuffers(gl, figureData);
  
  {
    const numComponentsPosition = 3;
    const numComponentsColors = 4;
    const type = gl.FLOAT;
    const sizeFloat = 4;
    const normalize = false;
    const positionOffset = 0;
    const colorOffset = numComponentsPosition * sizeFloat;
    const stride  = (numComponentsPosition + numComponentsColors) * sizeFloat; 

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferFigure.vertices);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponentsPosition,
      type,
      normalize,
      stride,
      positionOffset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponentsColors,
      type,
      normalize,
      stride,
      colorOffset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor);

  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferFigure.indices);

  {
    const vertexCount = figureData.indexCount;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(figureData.primitiveType, vertexCount, type, offset);
  }
  

    return modelViewMatrixFigure;
  
}

function initLinesBuffers(gl, lineData ) {


  const verticesBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    
    

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineData.vertices), gl.STATIC_DRAW);

  
  const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
     [1.0,  1.0,  1.0,  1.0],    // Front face: white
     [1.0,  1.0,  1.0,  1.0],    // Front face: white
  ];

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
  
  

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lineData.indices), gl.STATIC_DRAW);

  return {
    vertices: verticesBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function drawLine(gl, programInfo,   
modelViewMatrixLastStack, translation, rotation, lineData)
{
  
  var figModelViewMatrix2 = mat4.create();
  
  //  var modelViewMatrix = mat4.create();
 
  mat4.rotate(figModelViewMatrix2,  // destination matrix
              modelViewMatrixLastStack,  // matrix to rotate
              rotationSpeed,     
              rotation  );//[0, 1, 0]);     //=  rotate

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrixLastStack);
  
  
  var bufferLine = initLinesBuffers(gl, lineData )//;    
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferLine.vertices);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferLine.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferLine.indices);
  
  {
    const vertexCount = lineData.indexCount;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.LINES, vertexCount, type, offset);
  }
 
    return figModelViewMatrix2;
}


/*
function drawStar(gl, programInfo,  modelViewMatrixLastStack, translation,  figureData)
{
  
  var modelViewMatrixFigure = mat4.create();
  
  
  
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrixFigure);
  
  
  var bufferFigure = initBuffers(gl, figureData);
  
  {
    const numComponentsPosition = 3;
    const numComponentsColors = 4;
    const type = gl.FLOAT;
    const sizeFloat = 4;
    const normalize = false;
    const positionOffset = 0;
    const colorOffset = numComponentsPosition * sizeFloat;
    const stride  = (numComponentsPosition + numComponentsColors) * sizeFloat; 

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferFigure.vertices);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponentsPosition,
      type,
      normalize,
      stride,
      positionOffset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponentsColors,
      type,
      normalize,
      stride,
      colorOffset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexColor);

  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferFigure.indices);

  {
    const vertexCount = figureData.indexCount;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(figureData.primitiveType, vertexCount, type, offset);
  }
  

    return modelViewMatrixFigure;
  
}*/

function initLinesBuffers(gl, lineData ) {


  const verticesBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    
    

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineData.vertices), gl.STATIC_DRAW);

  
  const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
     [1.0,  1.0,  1.0,  1.0],    // Front face: white
     [1.0,  1.0,  1.0,  1.0],    // Front face: white
  ];

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  
  
  

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(lineData.indices), gl.STATIC_DRAW);

  return {
    vertices: verticesBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

