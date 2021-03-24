const tile=32;
let key_up=false, key_down=false, key_right=false, key_left=false;

let player;
let room;
let torches = [];
let items = [];
let places = [];
let torchplaces = [];
let light;
let lvls = [];
let idlvl = 0;
let portal; 
let intro = 4;

let mp3step, mp3insertion, mp3portal, mp3rzrzt, mp3clic;
let music_wind, music_noise, music_music;
let wall, flor, placeimg, portalimg, placempty, placetorch, playerimg, torchimg, redund;
let screen_end, arrows, wasd, mouse, tut_portal, tut_mouse, tut_slots, tut_torches, tut_torches2;
let intro_1, intro_2, intro_3, intro_continue, title;
let pipes = [];
let placimg = [];
let anim = 0;
let nxtanim = 0;
let mouseOnItem = false;

function keyPressed() {
  if (nxtanim>0) return;
  switch(keyCode) {
    case LEFT_ARROW:
      key_left = true
      break;
    case RIGHT_ARROW:
      key_right = true;
      break;
    case UP_ARROW:
      key_up = true;
      break;
    case DOWN_ARROW:
      key_down = true;
      break;
  }
  if (key=='A' || key=='a') {
    key_left = true;
  } else if (key=='D' || key=='d') {
    key_right = true;
  }  else if (key=='W' || key=='w') {
    key_up = true;
  }  else if (key=='S' || key=='s') {
    key_down = true;
  }
}

function keyReleased() {
  switch(keyCode) {
    case LEFT_ARROW:
      key_left = false;
      break;
    case RIGHT_ARROW:
      key_right = false;
      break;
    case UP_ARROW:
      key_up = false;
      break;
    case DOWN_ARROW:
      key_down = false;
      break;
  }
  if (key=='A' || key=='a') {
    key_left = false;
  } else if (key=='D' || key=='d') {
    key_right = false;
  }  else if (key=='W' || key=='w') {
    key_up = false;
  }  else if (key=='S' || key=='s') {
    key_down = false;
  }
}

function mousePressed() {
  if (intro>0) {
    mp3rzrzt.play();
    intro--;
  }
  if (nxtanim>0) return;
  let mx = Math.floor((mouseX-320+tile/2)/tile+player.x);
  let my = Math.floor((mouseY-320+tile/2)/tile+player.y);
  if (!light.lighted(mx,my)) return;
  for (let it of items) {
    if (mx==it.x && my==it.y) {
      it.drag = true;
      mp3clic.play();
    }
  }
}

function undrag() {
  for (let it2 of items) {
    it2.drag = false;
  }
}

function mouseReleased() {
  if (mouseX<0 || mouseX>=640 || mouseY<0 || mouseY>=640) {
    undrag();
    return;
  }
  let mx = Math.floor((mouseX-320+tile/2)/tile+player.x);
  let my = Math.floor((mouseY-320+tile/2)/tile+player.y);
  if (!light.lighted(mx,my)) {
    undrag();
    return;
  }
  for (let it of items) {
    if (mx==it.x && my==it.y) {
      undrag();
      return;
    }
  }
  for (let it of items) {
    if (it.drag) {
      for (let pl of places) {
        if (mx==pl.x && my==pl.y) {
          it.x = pl.x;
          it.y = pl.y;
          mp3insertion.play();
        }
        it.drag = false;
      }
    }
  }
}

function mouseMoved() {
  if (!player) return;
  let mx = Math.floor((mouseX-320+tile/2)/tile+player.x);
  let my = Math.floor((mouseY-320+tile/2)/tile+player.y);
  if (!light.lighted(mx, my)) return;
    
  let onItem = false;
  for (let it of items) {
    if (it.x==mx && it.y==my) {
      onItem = true;
      it.mouseon = true;
      break;
    }
  }
  if (onItem && !mouseOnItem) {
    //mp3rzrzt.play();
    mouseOnItem = true;
  } else if (!onItem) {
    mouseOnItem = false;
  }
}

function isMouseOn(x,y) {
  let mx = Math.floor((mouseX-320+tile/2)/tile+player.x);
  let my = Math.floor((mouseY-320+tile/2)/tile+player.y);
  return (mx == x && my == y);
}

function preload() {
  wall = loadImage("img/wall.png");
  flor = loadImage("img/floor.png");
  placeimg = loadImage("img/place.png");
  placetorch = loadImage("img/placetorch.png");
  portalimg = loadImage("img/portal.png");
  playerimg = loadImage("img/player.png");
  torchimg = loadImage("img/torch.png");
  redund = loadImage("img/redund.png");
  screen_end = loadImage("screens/ending.png");
  arrows = loadImage("screens/arrows.png");
  wasd = loadImage("screens/wasd.png");
  mouse = loadImage("screens/mouse.png");
  tut_portal = loadImage("screens/tut_portal.png");
  tut_mouse = loadImage("screens/tut_mouse.png");
  tut_slots = loadImage("screens/tut_slots.png");
  tut_torches = loadImage("screens/tut_torches.png");
  tut_torches2 = loadImage("screens/tut_torches2.png");
  intro_1 = loadImage("screens/intro1.png");
  intro_2 = loadImage("screens/intro2.png");
  intro_3 = loadImage("screens/intro3.png");
  intro_continue = loadImage("screens/intro_continue.png");
  title = loadImage("screens/title.png");
  
  pipes.push(loadImage("img/pipe1.png"));
  pipes.push(loadImage("img/pipe2.png"));
  pipes.push(loadImage("img/pipe3.png"));
  pipes.push(loadImage("img/pipe4.png"));
  pipes.push(loadImage("img/orb.png"));
  pipes.push(loadImage("img/pipe6.png"));
  pipes.push(loadImage("img/pipe7.png"));
  
  placimg.push(loadImage("img/placempty.png"));
  placimg.push(loadImage("img/place1.png"));
  placimg.push(loadImage("img/place2.png"));
  placimg.push(loadImage("img/place3.png"));
  placimg.push(loadImage("img/place4.png"));
  placimg.push(loadImage("img/place.png"));
  placimg.push(loadImage("img/place6.png"));
  placimg.push(loadImage("img/place7.png"));
  
  lvls.push(loadImage("levels/tut0.png"));
  lvls.push(loadImage("levels/tut1.png"));
  lvls.push(loadImage("levels/tut4.png"));
  lvls.push(loadImage("levels/tut2.png"));
  lvls.push(loadImage("levels/tut3.png"));
  lvls.push(loadImage("levels/tut5.png"));
  lvls.push(loadImage("levels/lvl1.png"));
  lvls.push(loadImage("levels/lvl2.png"));
  lvls.push(loadImage("levels/lvl3.png"));
  lvls.push(loadImage("levels/lvl4.png"));
  lvls.push(loadImage("levels/lvl5.png"));
  lvls.push(loadImage("levels/end.png"));
  
  
  mp3step = loadSound("sounds/step.mp3");
  mp3insertion = loadSound("sounds/insertion.mp3");
  mp3portal = loadSound("sounds/portal2.mp3");
  mp3rzrzt = loadSound("sounds/rzrzt2.mp3");
  mp3clic = loadSound("sounds/enter.mp3");
  
  music_wind = loadSound("music/wind.mp3");
  music_music = loadSound("music/music.mp3");
}

function setup() {
  player = new Player(0,0);
  anim = 0;
  room = new Room();
  room.load();
  music_wind.setVolume(0.4);
  music_wind.loop();
  music_music.setVolume(0.3);
  music_music.loop();
  
  createCanvas(640, 640);
  setFrameRate(30);
}

function draw()
{
  if (intro>0) {
    push();
    background(0);
    imageMode(CENTER);
    image(title, 320, 64);
    switch(intro) {
      case 1:
        image(intro_3, 320, 360+128);
        break;
      case 2:
        image(intro_2, 320-80, 360);
        break;
      case 3:
        image(intro_1, 320+80, 360-128);
        break;
    }
    image(intro_continue, 320, 600);
    pop();
    return;
  }
  
  if (idlvl==lvls.length) {
    image(screen_end,0,0);
    return;
  }
  
  if (anim==-2) {
    if (key_up) {
      player.go(0,-1);
    } else if (key_down) {
      player.go(0,1);
    } else if (key_left) {
      player.go(-1,0);
    } else if (key_right) {
      player.go(1,0);
    }
  }
  
  if (anim>0) {
    undrag();
    player.ax+=player.dir.x*8;
    player.ay+=player.dir.y*8
    if (--anim==0) {
      player.x += player.dir.x;
      player.y += player.dir.y;
      player.ax = 0;
      player.ay = 0;
      player.torches();
      if (portal.open && player.x==portal.x && player.y==portal.y) {
        if (++idlvl<lvls.length) {
          //room.load();
          nxtanim = 30;
          key_left = key_right = key_up = key_down = false;
        }
      }
    }
  } else if (anim>-2) {
    anim--;
  }
  
  room.openPortal();
  
  push();
  noStroke();
  translate(320, 320);
  translate(-player.x*tile-player.ax, -player.y*tile-player.ay);
  rectMode(CENTER);
  imageMode(CENTER);
  
  background(0);
  
  if (idlvl<lvls.length-1) {
    light.reset();
  }
  player.light();
  for (let tr of torches) {
    tr.light();
  }
  light.show();
  player.show();
  pop();
  
  if (idlvl<2) {
    push();
    imageMode(CENTER);
    image(arrows, 320, 160);
    image(wasd, 320, 480);
    image(tut_portal, 320, 240);
    pop();
  } else if (idlvl==2 && nxtanim<15) {
    push();
    imageMode(CENTER);
    image(mouse, 240, 320);
    image(tut_mouse, 320, 160);
    image(tut_slots, 320, 480);
    pop();
  } else if (idlvl==3 && nxtanim<15) {
    push();
    imageMode(CENTER);
    image(tut_slots, 320, 480);
    pop();
  } else if (idlvl==4 && nxtanim<15) {
    push();
    imageMode(CENTER);
    image(tut_torches, 320, 160);
    image(tut_torches2, 320, 480);
    pop();
  }
  
  if (nxtanim>0) {
    nxtanim--;
    let n=abs(nxtanim-15);
    push();
    fill(255/15*n,0,255/15*n, 255-255/15*n);
    rect(0,0,640,640);
    pop();
    if (nxtanim==15) {
      room.load();
    }
  }
}