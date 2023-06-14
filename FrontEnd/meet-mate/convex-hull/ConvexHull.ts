// 점 객체 정의
export const ConvexHull = (points: any[]) => {
    points.sort(function (a, b) {
        return a.lng != b.lng ? a.lng - b.lng : a.lat - b.lat;
    });

    var n = points.length;
    var hull = [];

    for (var i = 0; i < 2 * n; i++) {
        var j = i < n ? i : 2 * n - 1 - i;
        while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j]))
            hull.pop();
        hull.push(points[j]);
    }

    hull.pop();
    return hull;
}

function removeMiddle(a, b, c) {
    const cross = (a.lng - b.lng) * (c.lat - b.lat) - (a.lat - b.lat) * (c.lng - b.lng);
    const dot = (a.lng - b.lng) * (c.lng - b.lng) + (a.lat - b.lat) * (c.lat - b.lat);
    return cross < 0 || (cross == 0 && dot <= 0);
}