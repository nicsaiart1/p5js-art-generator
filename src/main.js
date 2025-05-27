let modules = [];
let shaderProgram;

function preload() {
  shaderProgram = loadShader('shaders/vert.glsl', 'shaders/frag.glsl');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  randomSeed(millis());
  const num = 20 + int(random(10));
  for (let i = 0; i < num; i++) {
    modules.push(new Module());
  }
}

function draw() {
  background(0);
  rotateY(frameCount * 0.001);
  for (let m of modules) {
    m.update(modules);
    m.display();
  }
}

class Module {
  constructor() {
    this.pos = createVector(random(-200, 200), random(-200, 200), random(-200, 200));
    this.vel = p5.Vector.random3D().mult(random(0.5));
    this.size = random(20, 80);
  }
  update(others) {
    for (let o of others) {
      if (o !== this) {
        const d = p5.Vector.dist(this.pos, o.pos);
        if (d < 80) {
          const repulse = p5.Vector.sub(this.pos, o.pos).normalize().mult(0.5);
          this.vel.add(repulse);
        }
      }
    }
    this.pos.add(this.vel);
    if (this.pos.mag() > 300) {
      this.pos.mult(-0.9);
    }
    this.vel.mult(0.98);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    shader(shaderProgram);
    shaderProgram.setUniform('u_time', millis() / 1000.0);
    shaderProgram.setUniform('u_resolution', [width, height]);
    shaderProgram.setUniform('u_pos', [this.pos.x, this.pos.y, this.pos.z]);
    box(this.size);
    resetShader();
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
