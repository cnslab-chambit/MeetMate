import { IBoundary, IMap } from "../_interfaces/interface";

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

export const setBoundary = (boundary: IBoundary, map: IMap) => {
  if (map) {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(
      new kakao.maps.LatLng(
        boundary?.y_1,
        boundary?.x_1
      )
    );
    bounds.extend(
      new kakao.maps.LatLng(
        boundary?.y_2,
        boundary?.x_2
      )
    );
    map?.setBounds(bounds);
  }
};