import frames.timing.*;
import frames.primitives.*;
import frames.core.*;
import frames.processing.*;

// 1. Frames' objects
Scene scene;
Frame frame;
Vector v1, v2, v3;
// timing
TimingTask spinningTask;
boolean yDirection;
// scaling is a power of 2
int n = 4;
int s = 1;
int maxSub = 3;

// 2. Hints
boolean triangleHint = true;
boolean gridHint = true;
boolean debug = true;
boolean subdivision = false;
boolean shading = false;
boolean sub = true;


// 3. Use FX2D, JAVA2D, P2D or P3D
String renderer = P3D;

void setup() {
  //use 2^n to change the dimensions
  size(1024, 1024, renderer);
  scene = new Scene(this);
  if (scene.is3D())
    scene.setType(Scene.Type.ORTHOGRAPHIC);
  scene.setRadius(width/2);
  scene.fitBallInterpolation();

  // not really needed here but create a spinning task
  // just to illustrate some frames.timing features. For
  // example, to see how 3D spinning from the horizon
  // (no bias from above nor from below) induces movement
  // on the frame instance (the one used to represent
  // onscreen pixels): upwards or backwards (or to the left
  // vs to the right)?
  // Press ' ' to play it
  // Press 'y' to change the spinning axes defined in the
  // world system.
  spinningTask = new TimingTask() {
    @Override
    public void execute() {
      scene.eye().orbit(scene.is2D() ? new Vector(0, 0, 1) :
        yDirection ? new Vector(0, 1, 0) : new Vector(1, 0, 0), PI / 100);
    }
  };
  scene.registerTask(spinningTask);

  frame = new Frame();
  frame.setScaling(width/pow(2, n));

  // init the triangle that's gonna be rasterized
  randomizeTriangle();
}

void draw() {
  background(0);
  stroke(0, 255, 0);
  if (gridHint)
    scene.drawGrid(scene.radius(), (int)pow(2, n));
  if (triangleHint)
    drawTriangleHint();
  pushMatrix();
  pushStyle();
  scene.applyTransformation(frame);
  triangleRaster();
  popStyle();
  popMatrix();
}

float orient2d(Vector a, Vector b, Vector c)
{
    return ( b.x()-a.x())*(c.y()-a.y()) - (b.y()-a.y())*(c.x()-a.x() );
}
int orient2dB(Vector a, Vector b, Vector c, Vector p){
    float w1 = orient2d(b, c, p); 
    float w2 = orient2d(c, a, p); 
    float w3 = orient2d(a, b, p); 
    if (w1 >= 0 && w2 >= 0 && w3 >= 0)
      return 1;
    else
      return 0;
}

// Implement this function to rasterize the triangle.
// Coordinates are given in the frame system which has a dimension of 2^n
void triangleRaster() {
  // frame.location converts points from world to frame
  // here we convert v1 to illustrate the idea
  noStroke();
  if(subdivision){
    fill(255, 255, 255);
  }else{
    fill(255, 255, 255);
  }
  int widthCell=width/(int)pow(2,n);
  float sc= 1/pow(2, s);
   for(int x=-width/2; x < width/2; x=x + widthCell){
    for(int y=-width/2; y < width/2; y= y + widthCell ){
      if(subdivision){
        Vector p= new Vector(x+widthCell/2,y+widthCell/2);
        float w0 = orient2d(v2, v3, p);
        float w1 = orient2d(v3, v1, p);
        float w2 = orient2d(v1, v2, p);
        if ( w0 >= 0 && w1 >= 0 && w2 >= 0 ){
          
          int wC= widthCell/(int)pow(2,s);
          ArrayList<Vector> points = new ArrayList<Vector>();
          for(int i= x; i < x + widthCell; i= i + wC){
            for(int j= y; j < y + widthCell; j= j + wC){
              
              Vector pc= new Vector(i + wC/2, j + wC/2);
              
              float wc0 = orient2d(v2, v3, pc);
              float wc1 = orient2d(v3, v1, pc);
              float wc2 = orient2d(v1, v2, pc);
              if ( wc0 >= 0 && wc1 >= 0 && wc2 >= 0 ){                
                Vector P= new Vector(i,j);
                points.add(P);
                
              } 
            }
            if(shading){
              int nC= (int)pow(2,s);
              nC= nC*nC;            
              int fc= round((points.size()*255)/nC);            
              fill(fc);
            }else{
              fill(255,255,0);
            }
            
            for(int k=0; k < points.size(); k++ ){
              rect(frame.location(points.get(k)).x(),frame.location(points.get(k)).y(),sc,sc);
            }
        }
        

        }
      }else{
        Vector p= new Vector(x+widthCell/2,y+widthCell/2);
        float w0 = orient2d(v2, v3, p);
        float w1 = orient2d(v3, v1, p);
        float w2 = orient2d(v1, v2, p);
        if ( w0 >= 0 && w1 >= 0 && w2 >= 0 ){
          Vector P= new Vector(x,y);
          rect(frame.location(P).x(),frame.location(P).y(),1,1);
        }
      }
      
    }
  }
  Vector p = new Vector(0,0);
  Vector v1_r = frame.location(v1);
  Vector v2_r = frame.location(v2);
  Vector v3_r = frame.location(v3);
  
  color c1 = color(255, 0, 0);
  color c2 = color(0, 255, 0);
  color c3 = color(0, 0, 255);
  float ar = orient2d(v1_r, v2_r, v3_r); 
  if (ar < 0){
    v2_r = frame.location(v3);
    v3_r = frame.location(v2);
    ar = orient2d(v1_r, v2_r, v3_r);
  }
  int size = round(pow(2, n)/2);
  for (float y = -size; y <= size; y++){
    for (float x = -size; x <= size; x++){
      p.set(x,y);
      float w1 = orient2d(v2_r, v3_r, p); 
      float w2 = orient2d(v3_r, v1_r, p); 
      float w3 = orient2d(v1_r, v2_r, p);
      if(sub){
        int  inside = 0;
        pushStyle();
        inside += orient2dB(v1_r, v2_r, v3_r, p);
        p.set(x,y+0.875);
        inside += orient2dB(v1_r, v2_r, v3_r, p);
        p.set(x+0.875,y);
        inside += orient2dB(v1_r, v2, v3_r, p);
        p.set(x+0.875,y+0.875);
        inside += orient2dB(v1_r, v2_r, v3_r, p);
        p.set(x,y);
        if(inside > 0){
          w1 /= ar; 
          w2 /= ar; 
          w3 /= ar; 
          float r = (w1 * red(c1) + w2 * red(c2) + w3 * red(c3)) * inside;
          float g = (w1 * green(c1) + w2 * green(c2) + w3 * green(c3)) * inside;
          float b = (w1 * blue(c1) + w2 * blue(c2) + w3 * blue(c3)) * inside;
          stroke(color(r/4, g/4, b/4));
          point(p.x(), p.y());
        }        
        popStyle();
      }  
      if ((w1 >= 0 && w2 >= 0 && w3 >= 0) && !sub) {            
                pushStyle();
                w1 /= ar; 
                w2 /= ar; 
                w3 /= ar; 
                float r = w1 * red(c1) + w2 * red(c2) + w3 * red(c3);
                float g = w1 * green(c1) + w2 * green(c2) + w3 * green(c3);
                float b = w1 * blue(c1) + w2 * blue(c2) + w3 * blue(c3);
                stroke(color(r, g, b));
                point(p.x(), p.y());
                popStyle();
      }
    }
  }
  
  if (debug) {
    pushStyle();
    stroke(255, 255, 0, 125);
    point(round(frame.location(v1).x()), round(frame.location(v1).y()));
    popStyle();
  }
}

void randomizeTriangle() {
  int low = -width/2;
  int high = width/2;
  v1 = new Vector(random(low, high), random(low, high));
  v2 = new Vector(random(low, high), random(low, high));
  v3 = new Vector(random(low, high), random(low, high));
  //v1.cross(v2);
  Vector v1_v2 = Vector.subtract(v2,v1);
  Vector v2_v3 = Vector.subtract(v3,v2);
  if(v1_v2.cross(v2_v3).z()< 0){
    Vector aux= v2;
    v2= v3;
    v3= aux;
  }
}

void drawTriangleHint() {
  pushStyle();
  noFill();
  strokeWeight(2);
  stroke(255, 0, 0);
  triangle(v1.x(), v1.y(), v2.x(), v2.y(), v3.x(), v3.y());
  strokeWeight(5);
  stroke(0, 0, 255);
  point(v1.x(), v1.y());
  stroke(0, 255, 0);
  point(v2.x(), v2.y());
  stroke(255, 0, 0);
  point(v3.x(), v3.y());
  popStyle();
}

void keyPressed() {
  if (key == 'g')
    gridHint = !gridHint;
  if (key == 't')
    triangleHint = !triangleHint;
  if (key == 'd')
    debug = !debug;
  if (key == '+') {
    n = n < 7 ? n+1 : 2;
    frame.setScaling(width/pow( 2, n));
  }
  if (key == '-') {
    n = n >2 ? n-1 : 7;
    frame.setScaling(width/pow( 2, n));
  }
  if (key == 'r')
    randomizeTriangle();
  if (key == ' ')
    if (spinningTask.isActive())
      spinningTask.stop();
    else
      spinningTask.run(20);
  if (key == 'y')
    yDirection = !yDirection;
    if (key == 'a')
    subdivision = !subdivision;
  if (key == 's')
    shading = !shading;
}

class barycentric
{
  float alpha;
  float beta;
  float gamma;
  String alphaS;
  String betaS;
  String gammaS;

  barycentric()
  {
    alpha = 0.0;
    beta = 0.0;
    gamma = 0.0;
  }

  barycentric(float A, float B, float C)
  {
    alpha = A;
    beta = B;
    gamma = C;
  }

  barycentric(float ax, float ay, float bx, float by, float cx, float cy, float x, float y)
  {
    float d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    alpha = ((by-cy)*(x-cx)+(cx-bx)*(y-cy)) / d;
    beta = ((cy-ay)*(x-cx)+(ax-cx)*(y-cy)) / d;
    gamma = 1.0 - alpha - beta;
    alphaS = nf(alpha,1,2);
    betaS = nf(beta,1,2);
    gammaS = nf(gamma,1,2);
  }

  float interpolate(float a, float b, float c)
  {
    return a * alpha + b * beta + c * gamma;
  }
}
