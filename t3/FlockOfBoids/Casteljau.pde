
class Casteljau extends Spline {
  protected List<Vector> points;
  
  public int degree ;
  
  public Casteljau(List<Vector> points) {
    super(points);
    this.degree= points.size() - 1;
  }
  @Override
    public void setPoints(List<Vector> points) {
    this.points = points;
  }

  @Override
  public void drawPath() {

    List<Vector> interpolation = new ArrayList<Vector>();
    float jump = 1;
    int n_fact = fact(this.degree);
   // for (int i = 0; i <= this.resolution; i++) {
      float t = jump;
      Vector new_point= P(t, n_fact);
      interpolation.add(new_point);
   // }
    for (int p = 0; p < interpolation.size()-1; p++) {
      line(
        interpolation.get(p).x(), interpolation.get(p).y(), interpolation.get(p).z(),
        interpolation.get(p+1).x(), interpolation.get(p+1).y(), interpolation.get(p+1).z()
      );
    }
  }

  public Vector P(float t, int n_fact){
    //n_fact = fact(n);
    float sum_x=0;
    float sum_y=0;
    float sum_z=0;

    for (int i=0; i<=this.degree; i++){
      float term= ( n_fact / ( fact(i) * fact(this.degree-i) ) ) * pow((1 - t), (this.degree - i)) * pow(t,i);
      sum_x += term * this.points.get(i).x();
      sum_y += term * this.points.get(i).y();
      sum_z += term * this.points.get(i).z();
    }

    return new Vector(sum_x, sum_y, sum_z);
  }

  public int fact(int n){
    return n == 0 ? 1 : n*fact(n-1);
  }
}
