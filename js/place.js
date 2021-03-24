class Place {
  constructor(x,y,img,id) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.id = id;
  }
  
  show() {
    push();
    image(this.img, this.x*tile, this.y*tile);
    pop();
  }
}