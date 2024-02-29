export const judgeActivation = (
  categories: string[],
  layoutSegments: string[]
) => {
  const activatedCategory = categories.find((category) =>
    layoutSegments.includes(category)
  );
  return activatedCategory || "";
};

export const isMapPage = (path: string) => {
  if (path.split("/")[2] === "map") {
    return true;
  }
  return false;
};
