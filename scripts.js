/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

class Edge {
  // edge between A and B;

  constructor(A, B) {
    if (!A.isAvailable || !B.isAvailable) return;

    const div = document.createElement("div");
    div.classList.add("edge");
    this.html = div;
    document.body.appendChild(div);

    const remove = () => {
      clearInterval(move);
      this.html.remove();
    };

    const update = () => {
      const rotate = Math.atan((B.y - A.y) / (B.x - A.x));
      const style = {
        width: Math.abs(A.x - B.x),
        height: Math.abs(A.y - B.y),
        top: A.y,
        left: A.x,
        transform: `rotate(calc(${rotate} * 1deg))`,
      };
      this.html.style = style;
    };

    update();

    const move = setInterval(() => {
      if (!A.isAvailable || !B.isAvailable) {
        remove();
        return;
      }

      update();
    }, 50);
    // after 2 seconds, this dot will vanish.
  }
}

class Dot {
  constructor(x, y, ind) {
    console.log(x, y);
    this.x = x;
    this.y = y;
    this.ind = ind;
    this.isAvailable = true;
    this.edges = [];
    // set up initial speed
    this.direction = {
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20,
    };
    this.createHtml();
    this.addEdges();
    // every 50ms, this dot will move
    const move = setInterval(() => {
      x += this.direction.dx;
      y += this.direction.dy;
      this.html.style.left = x + "px";
      this.html.style.top = y + "px";
    }, 50);
    // after 2 seconds, this dot will vanish.
    setTimeout(() => {
      clearInterval(move);
      this.html.remove();
      this.isAvailable = false;
      dots = dots.filter((d) => {
        return d.ind !== this.ind;
      });
    }, 2000);
  }

  // create html element
  createHtml() {
    const div = document.createElement("div");
    div.classList.add("dot");
    div.style.left = this.x + "px";
    div.style.top = this.y + "px";
    this.html = div;
    document.body.appendChild(div);
  }

  // distance to another dot 'A'
  distance(A) {
    const xdis = this.x - A.x,
      ydis = this.y - A.y;
    const dist = Math.sqrt(xdis * xdis + ydis * ydis);
    return dist;
  }

  addEdges() {
    const dotsCopy = [...dots];
    const closestDots = dotsCopy
      .filter((dot) => dot.index !== this.ind)
      .sort((A, B) => this.distance(A) - this.distance(B))
      .slice(0, 4);

    closestDots.forEach((dot) => {
      this.edges.push(new Edge(this, dot));
    });
  }
}

let dots = [];
const createDots = (event) => {
  //   console.log(event.target);
  let x = event.clientX;
  let y = event.clientY;
  dots.push(new Dot(x, y, dots.length));
  console.log(dots.length);
};
