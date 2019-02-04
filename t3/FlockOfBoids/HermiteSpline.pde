class HermiteSpline extends Spline {
  public HermiteSpline(List<Vector> points, int resolution) {
    super(points, resolution);
  }
  @Override
    public void Draw() {
    for (int i = 0; i<points.size()-1; i++) {
      Vector p0= this.points.get(i);
      Vector p1= this.points.get(i+1);

      Vector m0= new Vector();
      Vector m1= new Vector();
      
        if (i == 0) {
          m0= Vector.subtract( this.points.get(i+1), this.points.get(i) );
          m1= Vector.multiply( Vector.subtract( this.points.get(i+2), this.points.get(i) ), 0.5 );
          
        } else if (i == points.size()-2) {
          
          m0= Vector.multiply( Vector.subtract( this.points.get(i+1), this.points.get(i-1) ), 0.5 );
          m1= Vector.subtract( this.points.get(i+1), this.points.get(i) );
          
        } else {
          m0= Vector.multiply( Vector.subtract( this.points.get(i+1), this.points.get(i-1) ), 0.5 );
          m1= Vector.multiply( Vector.subtract( this.points.get(i+2), this.points.get(i) ), 0.5 );
          
        }
      
  
      Vector prev= points.get(i);
     
      float jump= 1/(float)this.resolution;
      for (float s = 0; s<= this.resolution; s+=1) {
        float t = jump * 1;
        float t2 = t*t;
        float t3 = t2*t;
        
        
        float p_x= (2*t3-3*t2+1)*p0.x() + (t3-2*t2+t)*m0.x() + (-2*t3+3*t2)*p1.x() + (t3-t2)*m1.x();
        float p_y= (2*t3-3*t2+1)*p0.y() + (t3-2*t2+t)*m0.y() + (-2*t3+3*t2)*p1.y() + (t3-t2)*m1.y();
        float p_z= (2*t3-3*t2+1)*p0.z() + (t3-2*t2+t)*m0.z() + (-2*t3+3*t2)*p1.z() + (t3-t2)*m1.z();
        
        Vector p= new Vector(p_x,p_y,p_z);
        
        line(prev.x(), prev.y(), prev.z(), p.x(), p.y(), p.z());
        prev= p;
        
      }
    }
  }
}
