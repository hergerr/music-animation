/**
 * Creates SVG bar for visualization with given position and size
 * with color based on its coordinates and height
 *
 * @param {number} x X-position of left-upper corner of rectangle
 * @param {number} y Y-position of left-upper corner of rectangle
 * @param {number} width width of the rectangle
 * @param {number} height height of the rectangle
 * @returns single svg rectangle bar for visualization
 */
export const createRectangle = (x, y, width, height) => {
  const NAMESPACE_URI = "http://www.w3.org/2000/svg";
  const rect = document.createElementNS(NAMESPACE_URI, "rect");

  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());

  rect.style.fill = "rgb(" + x + "," + y + "," + height + ")";

  return rect;
};
