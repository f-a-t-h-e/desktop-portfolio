type El = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function detectCollision(el1: El, el2: El) {
  return (
    el1.x < el2.x + el2.width &&
    el1.x + el1.width > el2.x &&
    el1.y < el2.y + el2.height &&
    el1.y + el1.height > el2.y
  );
  //   if (
  //     el1.x + el1.width < el2.x ||
  //     el1.y + el1.height < el2.y ||
  //     el2.x + el2.width < el1.x ||
  //     el2.y + el2.height < el1.y
  //   ) {
  //     return false;
  //   }
  //   return true;
}
