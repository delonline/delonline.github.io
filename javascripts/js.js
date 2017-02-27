function toggleMe() {
    var x = document.getElementById('myDIV');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

(function () {
  var toggle = document.getElementById('header-nav-toggle'),
      nav = document.getElementById('header-nav');
      
  // If JavaScript Is Enabled
  // Modify Initial States
  toggle.className = 'is-visible';
  nav.className = 'is-hidden';
  
  // Change Visibility On Click
  toggle.addEventListener('click', function() {
    if (nav.className === 'is-hidden') {
      nav.className = '';
    } else {
      nav.className = 'is-hidden';
    }
  })
})();



/*2/7/17*/
function Particle(pos) {
	this.pos = pos || createVector(random(width), random(height));
	this.xV = random(-6,6);
	this.yV = random(-6,6);
	this.r = 5;

	this.offCanvas = false;

	this.update = function() {
		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
			this.offCanvas = true;
		}
		this.pos.x += this.xV;
		this.pos.y += this.yV;
	};
}

var particles = [];
var shade;
var shadeMulti = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);

	shade = Math.floor(random(0,100));

	for (i = 0; i < 50; i++) {
		var angle = Math.random() * 360;
		var newVec = createVector(windowWidth * 0.5 + (cos(angle) * windowWidth/8), windowHeight * 0.5 - (sin(angle) * windowWidth/8));
		particles.push(new Particle(newVec));
	}

	setTimeout(function() {
		for (i = 0; i < 100; i++) {
			var angle = Math.random() * 360;
			var newVec = createVector(windowWidth * 0.5 + (cos(angle) * windowWidth/4), windowHeight * 0.5 - (sin(angle) * windowWidth/4));
			particles.push(new Particle(newVec));
		}
	}, 2000);
}

function mouseDragged() {
	particles.push(new Particle(createVector(mouseX, mouseY)));
}

function draw() {
	if (255 <= shade) {
		shadeMulti = -1;
	} else if (0 >= shade) {
		shadeMulti = 1;
	}

	shade += shadeMulti;

	for (var i = particles.length-1; i >= 0; i--) {
		if (!particles[i].offCanvas) {
			for (var j = particles.length-1; j >= 0; j--) {
				if (particles[i] !== particles[j]) {
					var d = dist(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
					if (d < 100) {
						var strokeColour = color(shade, d/2);
						stroke(strokeColour);
						line(particles[i].pos.x, particles[i].pos.y, particles[j].pos.x, particles[j].pos.y);
					}
				}
			}

			particles[i].update();
		} else {
			particles.splice(i, 1);
		}
	}
}

