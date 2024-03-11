let particles = [];
let objParticle;

/*function firework(options) {
  push();
  let baseHue = random(300);
  
  colorMode(HSB);
  for (let o = 0; o < 100; o++){
    let hue = random(0, 120);
    
    let position;
    if (options.p) {
      position = options.p.copy(); // 如果提供了位置p，则复制这个位置
    } else {
      position = createVector(width / 2, height / 2); // 否则使用画布中心
    }

    //let position = p || createVector(mouseX, mouseY);

    // random acceleration
    let velocity = p5.Vector.random2D().mult(random(1, options.fireR || 5));
    let acceleration = createVector(0, 0.1);

    //other feature
    //let radius = random(40);
    let radius = options.particleR || random(40);
    let particleColor = color((baseHue + random(0, 120)) % 360, 360, 360);


    //create particle and add in array
    let objParticle = new Particle(position, position, velocity, acceleration, radius, particleColor);
    particles.push(objParticle);
  }
  pop(); 
}*/
function firework(options) {
  push();
  let baseHue = random(300);
  
  colorMode(HSB);
  for (let o = 0; o < 200; o++) {
    let hue = random(0, 120);
    
    let position;
    if (options.p) {
      position = options.p.copy(); // If a position 'p' is provided, copy it
    } else {
      position = createVector(width / 2, height / 2); // Otherwise, use the canvas center
    }

    // Random acceleration
    let velocity = p5.Vector.random2D().mult(random(1, options.fireR || 5));
    let acceleration = createVector(0, 0.1);

    // Other features
    let radius = options.particleR || random(40);
    let particleColor = color((baseHue + random(0, 120)) % 360, 360, 360);

    // Create particle and add it to the array
    let objParticle = new Particle(position, velocity, acceleration, radius, particleColor);
    particles.push(objParticle);
  }
  pop(); 
}

//mouse
function mousePressed(){
  firework({
    p: createVector(mouseX,mouseY),
    fireR: random(1,100), //煙火的大小
    particleR: random(1,10) //粒子的大小
  })
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  
/*
  for (let i = 0; i < 50; i++){
    
    //objParticle.radius = 100;
    let x = width / 2;
    let y = height / 2;
    objParticle = new Particle(x, y);
    objParticle.velocity = p5.Vector.random2D().mult(5);
    //random2D() 函数返回一个方向随机的二维向量
    //用于将向量的长度乘以一个数值
    //mult(5) 表示将 random2D() 生成的随机向量的长度乘以 5
    objParticle.acceleration = createVector(0, 0.1);
    objParticle.radius = 20;
    objParticle.color = color(random(255), random(255), random(255));
    particles.push(objParticle);
  } */
}

function draw() {
  //background(220);
  fill(0, 5); //trail
  rect(0, 0, width, height);
  //在每一帧中以半透明的黑色覆盖整个画布。
  //这里的 fill(0, 5); 中的 0 代表黑色，而 5 是透明度
  //创建一个轻微的淡出效果，使得粒子轨迹看起来更平滑，
  //类似于烟花或其他光点在移动时留下的轨迹。

  for (let objParticle of particles) {//"for...of"遍历 particles 数组中的每个元素
    objParticle.update();
    objParticle.draw();
  }
  if (frameCount % 100 == 0) {
    firework({});
  }

  //filter
  particles = particles.filter(particle => !particle.isDead());
  
  //show and calculate particle numbers
  fill(0);
  rect(0, 0, 100, 50);
  fill(255);
  textSize(20);
  text(particles.length, 50, 30);
}
