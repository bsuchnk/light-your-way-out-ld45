class Portal {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.open = true;
  }
  
  show() {
    push();
    if (this.open) image(portalimg, this.x*tile, this.y*tile);
    pop();
  }
}