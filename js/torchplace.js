class TorchPlace {
  constructor(x,y,id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
  
  show() {
    push();
    image(placetorch, this.x*tile, this.y*tile);
    pop();
  }
}