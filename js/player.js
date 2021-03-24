class Player {
  constructor(x,y) {
    //this.life = 5;
    this.x=x;
    this.y=y;
    this.holdingTorch = false;
    this.dir = {x:0,y:1};
    this.ax = 0;
    this.ay = 0;
  }
  
  go(vx,vy) {
    for (let i=0; i<room.grid.length; i++) {
      if (room.grid[i].x==this.x+vx && room.grid[i].y==this.y+vy) {
        return;
      }
    }
    //this.x+=vx;
    //this.y+=vy;
    mp3step.play();
    this.dir.x = vx;
    this.dir.y = vy;
    anim = 4;
  }
  
  torches() {
    if (this.holdingTorch) {
      for (let tp of torchplaces) {
        if (tp.x==this.x && tp.y==this.y) {
          let freeplace = true;
          for (let tr of torches) {
            if (tr.x==tp.x && tr.y==tp.y) {
              freeplace = false;
              break;
            }
          }
          if (freeplace) {
            torches.push(new Torch(tp.x, tp.y));
            this.holdingTorch = false;
            mp3insertion.play();
          }
          return;
        }
      }
      return;
    }  
    
    for (let i=0; i<torches.length; i++) {
      let tr = torches[i];
      if (tr.x==this.x && tr.y==this.y) {
        this.holdingTorch = true;
        torches.splice(i,1);
        mp3insertion.play();
        return;
      }
    }
  }
  
  light() {
    if (idlvl==lvls.length-1) return;
    if (this.holdingTorch) {
      for (let i=this.x-3; i<=this.x+3; i++) {
        for (let j=this.y-3; j<=this.y+3; j++) {
          light.addTile(i,j);
        }
      }
    } else {
      for (let i=this.x-1; i<=this.x+1; i++) {
        for (let j=this.y-1; j<=this.y+1; j++) {
          light.addTile(i,j);
        }
      }
    }
  }
  
  show() {
    push();
    translate(this.x*tile+this.ax, this.y*tile+this.ay);
    //fill(255,0,255);
    //rect(0,0,tile-4,tile-4);
    image(playerimg,0,0);
    pop();
  }
}