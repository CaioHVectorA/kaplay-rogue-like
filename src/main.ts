import kaplay from "kaplay";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

const k = kaplay();
// const { onKeyDown } = kaplay();
const BASE_SPEED = 440;
let speed = BASE_SPEED;
k.loadRoot("./"); // A good idea for Itch.io publishing later
k.loadSprite("bean", "sprites/bean.png");

const player = k.add([k.pos(120, 80), k.sprite("bean"), k.area(), k.body()]);
const staminaBar = k.add([
  k.rect(150, 20),
  k.pos(10, 10),
  k.color(0, 0, 0),
  k.layer("ui"),
]);
k.onKeyDown(["left", "a"], () => {
  player.move(-speed, 0);
});

k.onKeyDown(["right", "d"], () => {
  player.move(speed, 0);
});

k.onKeyDown(["up", "w"], () => {
  player.move(0, -speed);
});

k.onKeyDown(["down", "s"], () => {
  player.move(0, speed);
});

k.onKeyDown("shift", async () => {
  speed = BASE_SPEED * 2;
  await k.wait(0.08);
  speed = BASE_SPEED;
});
k.onClick(() => k.addKaboom(k.mousePos()));
