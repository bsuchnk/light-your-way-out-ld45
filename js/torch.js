class Torch {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  
  light() {
    for (let i=this.x-3; i<=this.x+3; i++) {
      for (let j=this.y-3; j<=this.y+3; j++) {
        light.addTile(i,j);
      }
    }
  }
  
  show() {
    push();
      image(torchimg, this.x*tile, this.y*tile);
    pop();
  }
}