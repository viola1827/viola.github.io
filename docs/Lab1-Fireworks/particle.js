class Particle{
    constructor(position, velocity, acceleration, radius, color) {
        this.position = position.copy();
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.lifespan = 255.0;
        this.radius = radius;
        this.color = color;
    }
    
    draw() {
        //save setting
        push()
        noStroke();
        translate(this.position.x, this.position.y);
        fill(this.color);
        circle(0, 0, this.radius);
        pop();

    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.radius *= 0.933 //big -> small
        this.lifespan -= 2;
    }

    isDead() {
        return this.lifespan < 0;
    }

}