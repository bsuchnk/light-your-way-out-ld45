const rw = 101, rh = 101;

class Room {
  constructor() {
    this.grid = [];
  }
  
  load() {
    light = new Light();
    player = new Player(0,0);
    items = [];
    torches = [];
    places = [];
    torchplaces = [];
    this.grid = [];
    
    let lvl = lvls[idlvl];
    lvl.loadPixels();
    for (let i=0; i<lvl.width; i++) {
      for (let j=0; j<lvl.height; j++) {
        let r = lvl.pixels[(i+j*lvl.width)*4];
        let g = lvl.pixels[(i+j*lvl.width)*4+1];
        let b = lvl.pixels[(i+j*lvl.width)*4+2];
        
        let X = i-lvl.width/2;
        let Y = j-lvl.height/2;
        
        if (r==0 && g==0 && b==0) {
          room.grid.push({x:X,y:Y});
        } else if (r==255 && g<255 && b<255) {
          //console.log(r,g,b);
          if (g>0) {
            places.push(new Place(X,Y,placimg[g],g));
          }
          if (b>0) {
            items.push(new Item(X,Y,pipes[b-1],b));
            places.push(new Place(X,Y,placimg[g],0));
          }
          if (g==0 && b==0) {
            places.push(new Place(X,Y,placimg[0],0));
          }
        } else if (r<20 && g>250 && b>250) {
          portal = new Portal(X,Y);
        } else if (r==255 && g==255 && b==0) {
          torches.push(new Torch(X,Y));
        } else if (r==1 && g==1 && b==1) {
          player = new Player(X,Y);
        } else if (r==0 && g==255 && b==0) {
          torchplaces.push(new TorchPlace(X,Y));
        }
        
        if (idlvl==lvls.length-1) {
          light.addTile(X,Y);
        }
      }
    }
  }
  
  openPortal() {
    let po = portal.open;
    portal.open = false;
    for (let pl of places) {
      if (pl.id == 0) continue;
      let thereIsAnItem = false;
      for (let it of items) {
        if (it.id == pl.id && it.x==pl.x && it.y==pl.y) {
          thereIsAnItem = true;
          break;
        }
      }
      if (!thereIsAnItem) return;
    }
    portal.open = true;
    if (!po && portal.open) {
      mp3portal.play();
    }
  }
  
  show() {
    push();
    //translate(-player.x*tile, -player.y*tile);
    for (let i=0; i<this.grid.length; i++) {
      if (!light.lighted(this.grid[i].x,this.grid[i].y)) continue;
      fill(255);
      rect(this.grid[i].x*tile, this.grid[i].y*tile, tile, tile);
      fill(0);
      rect(this.grid[i].x*tile, this.grid[i].y*tile, tile-8, tile-8);
    }
    pop();
  }
}