public class NaturalCubicSpline {
  int x = 0;
  int y = 1;
  int z = 2;
  float[][] points;
  int l = points.length;
  float[] a = new float[l];
  float[] b = new float[l];
  float[] c = new float[l];
  float[] d = new float[l];
  
  public NaturalCubicSpline(float[][] points) {
    this.points = points;
  }

  private void setupMatrices(int pt) {
    b[0] = 2;
    c[0] = 1;
    d[0] = 3*(points[1][pt]-points[0][pt]);
    for(int i = 1; i<(l - 1); i++) {
      a[i] = 1;
      b[i] = 4;
      c[i] = 1;
      d[i] = 3*(points[i + 1][pt] - points[i - 1][pt]);
    }
    a[l-1] = 1;
    b[l-1] = 2;    
    d[l-1] = 3*(points[l - 1][pt] - points[l - 2][pt]);
  }
  
  private float[] solveMatrix(int n,int pt) {
    setupMatrices(pt);
    
    c[0]/=b[0];
    d[0]/=b[0];
   
    for(int i=1;i<n;i++) {
        c[i]/=(b[i]-a[i]*c[i-1]);
        d[i]=(d[i]-a[i]*d[i-1])/(b[i]-a[i]*c[i - 1]);
    }
    
    for(int i=n-2;i>=0;i--) {
        d[i] -= c[i]*d[i+1];
    }      
    return d;
  }
  
  public void paint(int side){
    float[][] d = new float[3][];

    d[x] = solveMatrix(points.length,x);
    d[y] = solveMatrix(points.length,y);
    d[z] = solveMatrix(points.length,z);

    for(int i = 0; i < points.length - 1; i++) {
      float[] ax = new float[3];
      float[] bx = new float[3];
      float[] cx = new float[3];
      float[] dx = new float[3];

      for(int n=0; n<3; n++) {
        ax[n] = points[i][n];
        bx[n] = d[n][i];
        cx[n] = 3*(points[i+1][n]-points[i][n])-2*d[n][i]-d[n][i+1];
        dx[n] = 2*(points[i][n]-points[i+1][n])+d[n][i]+d[n][i+1];
      }

      float[] s1 = new float[]{ points[i][x],points[i][y],points[i][z] };
      float[] s2 = new float[3];
      
      for(float m=0; m<=side; m++) {   
        pushStyle();
        stroke(125,125,125);
        strokeWeight(3);
        line(s1[0],s1[1],s1[2],s2[0],s2[1],s2[2]);
        float factor = (float)(m/side);
        s2[x] = ax[x] + bx[x]*factor + cx[x]* pow(factor,2) + dx[x]* pow(factor,3);
        s2[y] = ax[y] + bx[y]*factor + cx[y]* pow(factor,2) + dx[y]* pow(factor,3);
        s2[z] = ax[z] + bx[z]*factor + cx[z]* pow(factor,2) + dx[z]* pow(factor,3);
        popStyle();
        s1[0] = s2[0];
        s1[1] = s2[1];
        s1[2] = s2[2];
      }
    }
  }
}