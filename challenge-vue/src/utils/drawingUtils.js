export const createRectangle = (x, y, width, height) => {
  // create svg tag
  const svgns = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // create svg element rectangle
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());
  svgns.appendChild(rect);

  return svgns;
};
