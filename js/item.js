class Item {
  constructor(x,y,img,id) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.id = id;
    this.drag = false;
    this.mouseon = false;
  }
  
  show() {
    push();
    if (this.mouseon) {
      image(redund, this.x*tile, this.y*tile);
      if (!isMouseOn(this.x, this.y)) {
        this.mouseon = false;
      }
    }
    if (this.drag) {
      image(this.img, mouseX-320+player.x*tile, mouseY-320+player.y*tile);
    } else {
      image(this.img, this.x*tile, this.y*tile);
    }
    pop();
  }
}