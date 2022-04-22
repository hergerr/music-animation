/**
 * Creates SVG bar for visualization with given position and size
 *
 * @param {number} x X-position of left-bottom corner of rectangle
 * @param {number} y Y-position of left-bottom corner of rectangle
 * @param {number} width width of the rectangle
 * @param {number} height height of the rectangle
 * @returns single svg rectangle bar for visualization
 */
export const createRectangle = (x, y, width, height) => {
  const svgns = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());
  svgns.appendChild(rect);

  return svgns;
};
