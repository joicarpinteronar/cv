abstract class Spline{
  protected List<Vector> points;
  //protected int resolution;
  public Spline(List<Vector> points) {
    this.points = points;
    //this.resolution = resolution;
  }
  
  public void drawPath(){}
  public void setPoints(List<Vector> points){}
}
