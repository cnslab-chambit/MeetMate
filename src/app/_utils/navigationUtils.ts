export const judgeActivation = (
  categories: string[],
  layoutSegments: string[]
) => {
  console.log(layoutSegments);
  const activatedCategory = categories.find((category) =>
    layoutSegments.includes(category)
  );
  return activatedCategory;
};

export const isMapPage = (path: string) => {
  if (path.split("/")[2] === "map") {
    return true;
  }
  return false;
};

export const setBoundary = (boundary: any, map: any) => {
  if (map) {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(
        parseFloat(boundary?.bottom) - 0.15,
        parseFloat(boundary?.left)
      )
    );
    bounds.extend(
      new kakao.maps.LatLng(
        parseFloat(boundary?.top),
        parseFloat(boundary?.right)
      )
    );
    map?.setBounds(bounds);
  }
};
