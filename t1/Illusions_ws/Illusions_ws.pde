/*
  
 Ilusión 1: Scintillating Grid 
 Author: Rupert Russell, October 2, 2010
 Implementado desde cero...
 el código guía fue encontrado en: https://www.openprocessing.org/sketch/26605
Categoria: ilusión psicológica, rejilla, Hermann
 
 */
float spinStep = 2*PI/width;
float spin = 0;
int QuadrantPosition1 = 100;
int QuadrantPosition2 = 400;
boolean separateEllipses = false;
int illusions = 8;
int current = 1;
boolean active = true;

void setup() {
  size(800, 800);
}

void draw() {
  background(255);
  pushStyle();
  switch(current) {
    case 1:
      scintillating();
      break;
    case 2:
      motion_blindness();
      break;
    case 3:
      hering_ilusion();
      break;
    case 4:
      spiralGradient();
      break; 
    case 5:
      motionBinding();
      break;
    case 6:
      Circulos_Titchener();
      break;
    case 7:
     illusory_square();
      break;
    case 8:
      stteping_feet();
      break;
        
  }
  popStyle();
}
// Cambiar ilusion, usando la barra espaciadora
void keyPressed() {
  if (key == ' ')
    current = current < illusions ? current+1 : 1;
  if (key == 'a')
    active = !active;
}
// ilusiones
void scintillating() {
  background(0);          // fondo negro

  //estilo
  strokeWeight(3);        // lineas con peso - medio
  smooth();               // lineas antialias
  stroke(100, 100, 100);  // Gris oscuro para las lineas

  int step = 25;          // espaciado de la cuadricula

  //lineas verticales
  for (int x = step; x < width; x = x + step) {
    line(x, 0, x, height);
  }

  //lineas horizontales
  for (int y = step; y < height; y = y + step) {
    line(0, y, width, y);
  }

  // Circulos
  if (active) {
    ellipseMode(CENTER);
    stroke(255, 255, 255);  // circulos blancos
    for (int i = step; i < width -5; i = i + step) {
      for (int j = step; j < height -15; j = j + step) {
        strokeWeight(6); 
        point(i, j);
        strokeWeight(3);
      }
    }
  }
}

/* Ilusión 2: Motion Induced Blindness
 Autor: Grindley and Townsend in 1965
 el código guía fue encontrado en: https://www.openprocessing.org/sketch/168594
 Categoria: Fenómeno visual, visual disappearance
 */
 class Grid {
  Grid() {
  }

  void draw() {
    stroke(0, 0, 255);
    for (int x=-300; x<300; x=x+40) {
      for (int y=-300; y<300; y=y+40) {
        line(x, y+13, x+26, y+13);
        line(x+13, y, x+13, y+26);
      }
    }
  }
}
 
 void motion_blindness(){
   background(0);
  //elipses circundantes
  fill(255, 255, 0);
  noStroke();
  ellipse(240, 240, 8, 8);
  ellipse(560, 240, 8, 8);
  ellipse(400, 560, 8, 8);
  //cuadricula
  Grid grid = new Grid();
  translate(400, 400);
  rotate(millis()/1000.0);
  grid.draw();
  //elipse centro
  if ((frameCount/20) % 2 == 0) {
    noStroke();
    fill(100, 255, 100);
    ellipse(-7, -7, 8, 8);
  }
}


class Disc {
  float x, y;
  float diameter;
  boolean on = false;
   
  void start(float xpos, float ypos) {
    x = xpos;
    y = ypos; 
    diameter = 100;
    on = true;
  }

  void display() {
    if (on == true) {
      fill(200, 162, 200);
      noStroke();
      ellipse(x, y, diameter, diameter);
    }
  }
  
  void hide(float xpos, float ypos) {
    x = xpos;
    y = ypos; 
    diameter = 150;
    noStroke();
    fill(135, 135, 135);
    ellipse(x, y, diameter, diameter);
  }
}
/*
 
 Ilusión 3: Ilusion de Hering
 Autor: Ewald Hering en 1861.
 Basado de: https://www.illusionsindex.org/ir/hering-illusion
 Categoria: ilusión óptica geometrica, distorción de rectas
 
 */

void hering_ilusion() {

  background(255);
  translate(390, 390);
  stroke(0, 0, 0);
  for (int i=0; i<490; i=i+10) {
    rotate(5);
    line(0, 0, 400, 400);
  }  
  strokeWeight(2);
  //color de las lineas principales
  stroke(300, 100, 0);
  rotate(-245);
  translate(-250, -250);

  //Presionar una tecla para comprobar las lineas rectas
  if (keyPressed == true) {
    background(0);
  }  
  //Lineas verticales
  for (int i=0; i<300; i=i+100) {

    line(i, -200, 200, 600);
  }
  for (int i=300; i<501; i=i+100) {

    line(i, -200, 300, 600);
  }
  //Lineas horizontales
  line(-200, 200, 800, 200);
  line(-200, 300, 700, 300);
}  
/*
Ilusión 4: Reverse Spoke Ilusion
 Author: Sergio Cabezas, Febrero 26, 2016
 Codigo implementado desde cero, basado del enlace: http://www.michaelbach.de/ot/mot-spokes/index.html
 Categoria: Reverse, grises, Ilusión de movimiento
 */

void spiralGradient()
{
  background(180);
  translate(width/2, height/2);
  smooth();
  float rad = width/4 - 2;
  for(float i = 0; i<=width/2; i++)
  {
    strokeWeight(3);
    float step = map(i, 0, width/2, 0, 1);
    color c = lerpColor(color(255), color(0), step);
    stroke(c);
    float par = map(i, 0, width/2, 0, PI);
    line(cos(par+(8*spin))*rad, sin(par+(8*spin))*rad, 0, 0);
    line(cos(-par+(8*spin))*rad, sin(-par+(8*spin))*rad, 0, 0);
    //arc(width/2, height/2, width/2, height/2, PI, TWO_PI);
  }
  spin = active == true ? spin+=spinStep : spin;
  stroke(128);
  strokeWeight(2);
  for(int i=0; i<7; i++)
  {
    float par = map(i, 0, 7, 0, PI);
    line(cos(par)*rad, sin(par)*rad, -cos(par)*rad, -sin(par)*rad);    
  }
  stroke(180);
  noFill();
  ellipse(0, 0 , width/2, width/2);
}
/*
Ilusión 5: Motion Binding
 Author: Sergio Cabezas, Febrero 26, 2016
Codigo implementado desde cero, basado del enlace: http://www.michaelbach.de/ot/mot-motionBinding/index.html
Categoria: Cuadrilateros, ilusión de movimiento, lineas por par
*/
void motionBinding()
{
  background(170);  
  translate(width/2, 0);
  rotate(PI/4);
  rectMode(CORNERS);
  stroke(0, 0, 255);
  strokeWeight(8);
  noFill();
  rect((cos(10*spin)*30)+50, (sin(10*spin)*30)+50, (cos(10*spin)*30)+(50+(height/2-100)), (sin(10*spin)*30)+(50+(height/2-100)));
  spin = spin+=spinStep;
  
  rectMode(CORNER);
  noStroke();
  
  if(active!=true)
    fill(0, 255, 0);
  else
    fill(170);
  
  rect(0, 0, 100, 100);
  rect(height/2-100, 0, 100, 100);
  rect(0, height/2-100, 100, 100);
  rect(height/2-100, height/2-100, 100, 100);
}
/*
Ilusión 6: Circle Titchener 
Author: Hermann Ebbinghaus, 1897
Codigo implementado desde cero
Categoria: ilusión psicológica
*/
float angle;
void Circulos_Titchener(){
  noStroke();
  fill(255,0,255);
  ellipse(height/4,width/2,50,50);
  ellipse(3*width/4-50,height/2,50,50);
  
  if(active){
    pushMatrix();
    fill(255,0,255);
    translate(height/4,width/2);
    ellipse(0,0,50,50);
    fill(255,255,0);
    float x=50*cos(radians(angle));
    float y=50*sin(radians(angle));
    ellipse(x, y, 35, 35);
    
    float x4=50*cos(radians(angle+45));
    float y4=50*sin(radians(angle+45));
    ellipse(x4, y4, 35, 35);
   
   float x1=50*cos(radians(angle+90));
    float y1=50*sin(radians(angle+90));
    ellipse(x1, y1, 35, 35);
  
    float x5=50*cos(radians(angle+135));
    float y5=50*sin(radians(angle+135));
    ellipse(x5, y5, 35, 35);
    
    float x2=50*cos(radians(angle+180));
    float y2=50*sin(radians(angle+180));
    ellipse(x2, y2, 35, 35);
    
    float x6=50*cos(radians(angle+225));
    float y6=50*sin(radians(angle+225));
    ellipse(x6, y6, 35, 35);
    
    float x3=50*cos(radians(angle+270));
    float y3=50*sin(radians(angle+270));
    ellipse(x3, y3, 35, 35);
    
    float x7=50*cos(radians(angle+315));
    float y7=50*sin(radians(angle+315));
    ellipse(x7, y7, 35, 35);
    
    popMatrix();
    
    pushMatrix();
    
    translate(3*width/4-50,height/2);
    fill(255,0,255);
    ellipse(0,0,50,50);
    fill(255,255,0);
    float a=150*cos(radians(angle));
    float b=150*sin(radians(angle));
    ellipse(a, b, 145, 145);
    
    float a4=150*cos(radians(angle+60));
    float b4=150*sin(radians(angle+60));
    ellipse(a4, b4, 145, 145);
       
    float a1=150*cos(radians(angle+120));
    float b1=150*sin(radians(angle+120));
    ellipse(a1, b1, 145, 145);
        
    float a5=150*cos(radians(angle+180));
    float b5=150*sin(radians(angle+180));
    ellipse(a5, b5, 145, 145);
    
    float a2=150*cos(radians(angle+240));
    float b2=150*sin(radians(angle+240));
    ellipse(a2, b2, 145,145);
    
    float a6=150*cos(radians(angle+300));
    float b6=150*sin(radians(angle+300));
    ellipse(a6, b6, 145,145);
    
    float a3=150*cos(radians(angle+360));
    float b3=150*sin(radians(angle+360));
    ellipse(a3, b3, 145, 145);
   
    popMatrix();
  }
}
/*
Ilusión 7: Illusory Square 
Codigo basado de: https://www.openprocessing.org/sketch/168628
Categoria: ilusión geométrica
*/
void illusory_square(){
  background(0);
  rectMode(CENTER);
  stroke(255);
  noFill();
  rect(250, 250, 150, 150);
  
  if (QuadrantPosition1>=165) {
    separateEllipses = true;
  }
  if (QuadrantPosition1==100) {
    separateEllipses = false;
  }
  if (separateEllipses == false) {
    QuadrantPosition1++;
    QuadrantPosition2--;
  }
  else {
    QuadrantPosition1--;
    QuadrantPosition2++;
  }
  noStroke();
  
  
  fill(100);
  ellipse(QuadrantPosition1, 250, 100, 100);
  ellipse(250, QuadrantPosition1, 100, 100);
  ellipse(QuadrantPosition2, 250, 100, 100);
  ellipse(250, QuadrantPosition2, 100, 100);
  
  
  fill(210);
  ellipse(QuadrantPosition1+190, 250, 20, 20);
  ellipse(250, QuadrantPosition1+190, 20, 20);
  ellipse(QuadrantPosition2-190, 250, 20, 20);
  ellipse(250, QuadrantPosition2-190, 20, 20);
}

/*
 Ilusión 8: Stepping feet.
 Autor: Stuart Anstis 2003.
 Codigo Implementado desde cero, guiado por sketches cómo: https://www.openprocessing.org/sketch/1
 Categoria: ilusión óptica de percepción, Distorción de relidad
 */
float x;

void stteping_feet() {
  //Dibujando lineas de fondo
  for (int i = 0; i < 70; i++) {
    noStroke();
    fill(0);
    rect(i * 20, 0, 10, height);
  }

  for (int j=0; j<9; j++) {
    if (j%2==0) {
      fill(0);
    } else {
      fill(255);
    }
    //rectangulos
    rect(x, j*90 + 5, 60, 50);
  }
  //linea que encierra para comprobar el efecto
  if (keyPressed==true) {
    stroke(0, 0, 255);
    strokeWeight(5);
    noFill();
    rect(x, 5, 60, 900);
  }    
  x =  x+1;
  if (x > width) {
    x = 0;
  }
}
