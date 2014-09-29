public Player player;
public Ground gnd;
public Hill hillobj;
public PImage bee1, bee2, beedead, ground, bg;
public PImage hill, hill2, hillred, hillred2;
public PImage bush, grass, bubble;
public boolean dead = false;
public boolean gameOver = false;
public boolean firstGame = true;
public Hill[] hills;
public Bush[] bushes;
public int speed = 5;
public int score = 0;
public int wings = 9;
public int factor = 4;
public int highScore = 0;
public int jumpGravity = -15;
public int hillDistance;
public int hillCount;
public int smallText = 22;
public int bigText = 32;
public int textSpacing = 50;
public float screenfactor = 1;
public float gravityfactor = 1;
public float realspeed = 5;
public ArrayList<Bubble> bubbles;


var showOnce = undefined;

void setup()
{
//  size(320, 480);
  size(window.innerWidth, window.innerHeight);
  background(255);

  screenfactor = height/float(480);
  speed = int(5 * screenfactor);
  realspeed = speed;
  jumpGravity = - int(14*screenfactor);

  player = new Player();
  gnd = new Ground();
  hillDistance = player.sizeX * 4;
  hillCount = int(width/hillDistance)+1;
  hills = new Hill[hillCount];
  for (int i = 0;i<hillCount;i++)
  {
    hills[i] = new Hill(-(i*hillDistance));
  }

  bushes = new Bush[2];
  for (int i = 0;i<bushes.length;i++)
  {
    bushes[i] = new Bush(i%2);
  }

  bubbles = new ArrayList<Bubble>();

  frameRate(30);
  rectMode(CORNER);
  textAlign(CENTER);

  ground = loadImage("data/ground.png");
  if (height<=480)
  {
    bee1 = loadImage("data/bee1.png");
    bee2 = loadImage("data/bee2.png");
    beedead = loadImage("data/bee_dead.png");
    bush = loadImage("data/bush.png");
    grass = loadImage("data/grass.png");
    bubble = loadImage("data/bubble.png");
    bg=loadImage("data/bg.png");
    hill = loadImage("data/hill.png");
    hill2 = loadImage("data/hill2.png");
    hillred = loadImage("data/hillred.png");
    hillred2 = loadImage("data/hillred2.png");
  }
  else
  {
    bee1 = loadImage("data/hdbee1.png");
    bee2 = loadImage("data/hdbee2.png");
    beedead = loadImage("data/hdbee_dead.png");
    bush = loadImage("data/hdbush.png");
    grass = loadImage("data/hdgrass.png");
    bubble = loadImage("data/hdbubble.png");
    bg=loadImage("data/hdbg.png");
    hill = loadImage("data/hdhill.png");
    hill2 = loadImage("data/hdhill2.png");
    hillred = loadImage("data/hdhillred.png");
    hillred2 = loadImage("data/hdhillred2.png");
  }

  gravityfactor = 8/float(player.maxGravity);
  smallText = int(22*screenfactor);
  bigText = int(32*screenfactor);
  textSpacing = int(50*screenfactor);
}

void draw()
{
  background(89, 121, 152);
  if (!firstGame)
    player.calculateGravity();

  // move shit
  if (!dead && !firstGame)
  {
    player.checkBounds();
    gnd.move();

    for (int i = 0;i<hillCount;i++)
      hills[i].move();

    for (int i = 0;i<bushes.length;i++)
      bushes[i].move();
  }

  //draw hills for collision and check score
  for (int i = 0;i<hillCount;i++)
  {
    hills[i].drawHill();
    if (!hills[i].counted && player.x*4 < hills[i].hmove-hills[i].sizeX)
    {
      hills[i].counted = true;
      score++;
      if (speed<(9*screenfactor))
      {
        realspeed += 0.03*screenfactor;
        speed = int(realspeed);
      }
    }
  }
  checkCollision();
  image(bg, 0, 0, width, height);

  //draw again hills
  for (int i = 0;i<hillCount;i++)
  {
    hills[i].drawHill();
  }

  //draw bushes
  for (int i = 0;i<bushes.length;i++)
    bushes[i].drawBush();

  drawGround();

  //draw bee
  if (!dead)
  {
    player.drawBee();
  }
  else
  {
    image(beedead, player.x, player.y, player.sizeX, player.sizeY);
    if (gameOver)
    {
      if (score>highScore)
        highScore= score;

      fill(255);
      textSize(bigText);
      text("GAME OVER", width/2, height/2-textSpacing);
      textSize(smallText);
      text("Touch to restart", width/2, height/2);
      text("Highscore: "+highScore, width/2, height/2+textSpacing);

      if (showOnce != 1) {
        window.__score__ = {
          "score": score
        }
        console.log(window.__score__);
        
        setTimeout(function(){
            
            if ( window.Android ) {
                window.Android.showShare(JSON.stringify(__score__));
            } else {
                window.P.showShare(__score__);
            }
        },1000);
        showOnce = 1;
      }
    }
    if (mousePressed)
    {
      showOnce = 0;
      newGame();
    }
  }

  //draw and move bubbles
  for (int i = 0;i<bubbles.size();i++)
  {
    bubbles.get(i).move();
    bubbles.get(i).drawBubble();
  }

  //remove unseen bubbles
  for (int i = bubbles.size()-1;i>=0;i--)
  {
    if (bubbles.get(i).toDelete)
    {
      bubbles.remove(i);
    }
  }

  //draw some random bubbles
  if (frameCount%100==0)
    bubbles.add(new Bubble(int(random(0, width+150)), height));

  //draw score
  fill(255);
  textSize(smallText);
  text(score, width/2, textSpacing+20);

  if (firstGame)
  {

    fill(255);
    textSize(bigText);
    text("Lost Fish", width/2, height/2-textSpacing);
    if (frameCount%40>20)
    {
      textSize(smallText);
      text("Touch to start", width/2, height/2);
    }

    if (mousePressed)
    {
      firstGame = false;
    }
  }
}


public void drawGround()
{
  for (int i =0;i<width+70;i+=70)
  {
    image(ground, i-gnd.gmove, height-40, 70, 70);
  }
}

public void newGame()
{
  if (dead && gameOver)
  {
    speed = int(5 * screenfactor);
    realspeed = speed;
    gameOver=false;
    dead=false;
    player = new Player();
    hills = new Hill[hillCount];
    for (int i = 0;i<hillCount;i++)
    {
      hills[i] = new Hill(-(i*hillDistance));
    }
    score = 0;
  }
}

public void checkCollision()
{
  color c1 = get(player.x+player.x1, player.y+player.y1);
  color c2 = get(player.x+player.x2, player.y+player.y2);
  color c3 = get(player.x+player.x3, player.y+player.y3);
  color c4 = get(player.x+player.x4, player.y+player.y4);

  if (c1!=-10913384 || c2!=-10913384 || c3!=-10913384 || c4!=-10913384)
    dead=true;
}

void mouseReleased()
{
  if (!dead)
  {
    bubbles.add(new Bubble(player.x+player.sizeX, player.y));
    player.gravity = jumpGravity;
  }
}

public class Player {
  public int x;
  public int y;
  public int sizeX;
  public int sizeY;
  public float gravity;
  public int maxGravity;
  public int x1;
  public int y1;
  public int x2;
  public int y2;
  public int x3;
  public int y3;
  public int x4;
  public int y4;

  public Player()
  {
    x = int(width/5);
    y = int(height/2);
    sizeX = int(60*screenfactor);
    sizeY = int(45*screenfactor);
    maxGravity= int(8*screenfactor);
    gravity = 0;

    x1 = int(sizeX * 0.95);
    y1 = int(sizeY * 0.11);

    x2 = int(sizeX * 0.95);
    y2 = int(sizeY * 0.89);

    x3 = int(sizeX * 0.05);
    y3 = int(sizeY * 0.3);

    x4 = int(sizeX * 0.05);
    y4 = int(sizeY * 0.7);
  }

  public void calculateGravity()
  {
    gravity += screenfactor;
    if (gravity > maxGravity && !dead)
      gravity = maxGravity;

    if (gravity<0)
      speed = int(realspeed*1.15);
    else
      speed = int(realspeed);

    y = y + int(gravity);

    if (dead && player.y>height)
      gameOver=true;
  }

  public void drawBee()
  {
    wings = 9;
    factor = 4;
    if (gravity <0 )
    {
      wings = 5;
      factor = 2;
    }

    pushMatrix();
    translate(x, y);
    pushMatrix();
    rotate(radians(gravity*gravityfactor));
    if (frameCount%wings>factor)
      image(bee1, 0, 0, sizeX, sizeY);
    else
      image(bee2, 0, 0, sizeX, sizeY);
    popMatrix();
    popMatrix();
  }

  public void checkBounds()
  {
    if (y+sizeY>height-gnd.gndheight)
    {
      y = height-sizeY-gnd.gndheight;
    }
    else if (y<0)
    {
      y = 0;
      gravity = -gravity;
    }
  }
}

public class Ground {
  public int gndheight = 40;
  public int gmove = 0;

  public Ground()
  {
    gndheight = 40;
    gmove = 0;
  }

  public void move()
  {
    gmove += speed;
    if (gmove>=70)
    {
      gmove=0;
    }
  }
}

public class Hill {
  public int hmove;
  public int hy;
  public int sizeX;
  public int sizeY;
  public boolean counted = false;
  public boolean red = false;

  public Hill(int position)
  {
    hmove = position;
    randomY();
    sizeX = int(48*screenfactor);
    sizeY = int(850*screenfactor);
  }

  public void randomY()
  {
    hy = int(random(-int(300*screenfactor), -int(120*screenfactor)));
  }

  public void move() {
    hmove += speed;
    if (hmove>=width+sizeX)
    {
      hmove=-(hillCount*hillDistance-width-sizeX);
      randomY();
      counted=false;
      if (score+hills.length>39)
        red=true;
    }
  }

  public void drawHill()
  {
    if (red)
    {
      if (frameCount%10<5)
        image(hillred, width-hmove, hy, sizeX, sizeY);
      else
        image(hillred2, width-hmove, hy, sizeX, sizeY);
    }
    else
    {
      if (frameCount%10<5)
        image(hill, width-hmove, hy, sizeX, sizeY);
      else
        image(hill2, width-hmove, hy, sizeX, sizeY);
    }
  }
}

public class Bush {
  public int bmove = 0;
  public int sizeX;
  public int sizeY;
  public int nr;

  public Bush(int nr)
  {
    this.nr = nr;
    if (nr==0)
    {
      sizeX = int(100*screenfactor);
      sizeY = int(37*screenfactor);
    }
    else
    {
      sizeX = int(44*screenfactor);
      sizeY = int(50*screenfactor);
    }
    randomX();
  }

  public void randomX()
  {
    bmove = int(random(-width, 0));
  }

  public void move() {
    bmove += speed;
    if (bmove>=width+sizeX)
    {
      bmove=0;
      randomX();
    }
  }

  public void drawBush()
  {
    if (nr==0)
      image(bush, width-bmove, height-40-sizeY, sizeX, sizeY);
    else
      image(grass, width-bmove, height-40-sizeY, sizeX, sizeY);
  }
}

public class Bubble {
  public int x;
  public int y;
  public int size;
  public boolean toDelete;

  public Bubble(int x, int y)
  {
    toDelete=false;
    this.x = x;
    this.y = y;
    size = int(15*screenfactor);
  }

  public void move()
  {
    if (!dead)
      x-=speed;
    y-=speed;

    if (x+size<0||y+size<0)
    {
      toDelete=true;
    }
  }

  public void drawBubble()
  {
    image(bubble, x, y, size, size);
  }
}
