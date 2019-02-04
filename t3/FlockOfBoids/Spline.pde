abstract class Spline{
  protected List<Vector> points;
  protected int resolution;
  public Spline(List<Vector> points, int resolution) {
    this.points = points;
    this.resolution = resolution;
  }
  
  public void Draw(){}
}