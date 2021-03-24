class Light {
  constructor() {
    this.grid = [];
  }
  
  reset() {
    this.grid = [];
  }

  addTile(X,Y) {
    this.grid.push({x:X,y:Y});
  }
  
  show() {
    push();
    fill(127);
    for (let gr of this.grid) {
      //console.log(gr.x, gr.y);
      //rect(gr.x*tile, gr.y*tile, tile, tile);
      let isfloor = true;
      for (let rm of room.grid) {
        if (rm.x==gr.x && rm.y==gr.y) {
          image(wall, gr.x*tile, gr.y*tile);
          isfloor = false;
          break;
        }
      }
      for (let pl of places) {
        if (pl.x==gr.x && pl.y==gr.y) {
          pl.show();
          isfloor = false;
          break;
        }
      }
      for (let tp of torchplaces) {
        if (tp.x==gr.x && tp.y==gr.y) {
          tp.show();
          isfloor = false;
          break;
        }
      }
      if (portal.open && portal.x==gr.x && portal.y==gr.y) {
        portal.show();
        isfloor = false;
      }
      if (isfloor) {
        image(flor, gr.x*tile, gr.y*tile);
      }
      
      for (let it of items) {
        if (it.drag || (it.x==gr.x && it.y==gr.y)) {
          it.show();
        }
      }
    }
    for (let tr of torches) {
      tr.show();
    }
    pop();
  }
  
  lighted(x,y) {
    for (let i=0; i<this.grid.length; i++) {
      if (this.grid[i].x==x && this.grid[i].y==y) return true;
    }
    return false;
  }
}