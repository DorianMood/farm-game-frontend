const WHEEL_SCALE_SPEEDUP = 2;
const WHEEL_TRANSLATION_SPEEDUP = 2;
const DELTA_LINE_MULTIPLIER = 8;
const DELTA_PAGE_MULTIPLIER = 24;
const MAX_WHEEL_DELTA = 24;

export type Point = {
  x: number;
  y: number;
};

export type WheelGesture = {
  origin: Point;
  scale: number;
  translation: Point;
};

export type TouchGesture = {
  scale: number;
  rotation?: number;
  translation: Point;
  origin: Point;
};

function limit(delta: number, max_delta: number) {
  return Math.sign(delta) * Math.min(max_delta, Math.abs(delta));
}

function normalizeWheel(e: WheelEvent) {
  let dx = e.deltaX;
  let dy = e.deltaY;
  if (e.shiftKey && dx === 0) {
    [dx, dy] = [dy, dx];
  }
  if (e.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    dx *= DELTA_LINE_MULTIPLIER;
    dy *= DELTA_LINE_MULTIPLIER;
  } else if (e.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    dx *= DELTA_PAGE_MULTIPLIER;
    dy *= DELTA_PAGE_MULTIPLIER;
  }
  return [limit(dx, MAX_WHEEL_DELTA), limit(dy, MAX_WHEEL_DELTA)];
}

function midpoint(touches: TouchList): Point {
  let [t1, t2] = touches;
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  };
}

function distance(touches: TouchList) {
  let [t1, t2] = touches;
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function angle(touches: TouchList) {
  let [t1, t2] = touches;
  let dx = t2.clientX - t1.clientX;
  let dy = t2.clientY - t1.clientY;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

type Options = {
  startGesture: (gesture: TouchGesture | WheelGesture) => void;
  doGesture: (gesture: TouchGesture | WheelGesture) => void;
  endGesture: (gesture: TouchGesture | WheelGesture) => void;
};

function okzoomer(container: HTMLElement, opts: Options) {
  function noop() {
    /* do nothing */
  }

  let options = opts || {};

  let startGesture = options.startGesture || noop;
  let doGesture = options.doGesture || noop;
  let endGesture = options.endGesture || noop;

  let wheel_gesture: WheelGesture | null = null;
  let timer: number;
  container.addEventListener(
    "wheel",
    function wheelListener(e: WheelEvent) {
      if (e.cancelable !== false) {
        e.preventDefault();
      }
      let [dx, dy] = normalizeWheel(e);

      if (!wheel_gesture) {
        wheel_gesture = {
          origin: { x: e.clientX, y: e.clientY },
          scale: 1,
          translation: { x: 0, y: 0 },
        };
        startGesture(wheel_gesture);
      }

      if (e.ctrlKey) {
        // pinch-zoom gesture
        let factor =
          dy <= 0
            ? 1 - (WHEEL_SCALE_SPEEDUP * dy) / 100
            : 1 / (1 + (WHEEL_SCALE_SPEEDUP * dy) / 100);
        wheel_gesture = {
          origin: { x: e.clientX, y: e.clientY },
          scale: wheel_gesture.scale * factor,
          translation: wheel_gesture.translation,
        };
      } else {
        // pan gesture
        wheel_gesture = {
          origin: { x: e.clientX, y: e.clientY },
          scale: wheel_gesture.scale,
          translation: {
            x: wheel_gesture.translation.x - WHEEL_TRANSLATION_SPEEDUP * dx,
            y: wheel_gesture.translation.y - WHEEL_TRANSLATION_SPEEDUP * dy,
          },
        };
      }
      doGesture(wheel_gesture);

      if (timer) {
        window.clearTimeout(timer);
      }
      timer = window.setTimeout(function () {
        if (wheel_gesture) {
          endGesture(wheel_gesture);
          wheel_gesture = null;
        }
      }, 200);
    },
    {
      passive: false,
    },
  );

  let initial_touches: TouchList;
  let touch_gesture: TouchGesture | null = null;
  function touchMove(e: TouchEvent) {
    if (e.touches.length === 2) {
      let mp_init = midpoint(initial_touches);
      let mp_curr = midpoint(e.touches);
      touch_gesture = {
        scale: distance(e.touches) / distance(initial_touches),
        rotation: angle(e.touches) - angle(initial_touches),
        translation: {
          x: mp_curr.x - mp_init.x,
          y: mp_curr.y - mp_init.y,
        },
        origin: mp_init,
      };
      doGesture(touch_gesture);
      if (e.cancelable !== false) {
        e.preventDefault();
      }
    }
  }

  container.addEventListener(
    "touchstart",
    function watchTouches(e: TouchEvent): void {
      if (e.touches.length === 2) {
        initial_touches = e.touches;
        touch_gesture = {
          scale: 1,
          rotation: 0,
          translation: { x: 0, y: 0 },
          origin: midpoint(initial_touches),
        };
        if (e.type === "touchstart" && e.cancelable !== false) {
          e.preventDefault();
        }
        startGesture(touch_gesture);
        container.addEventListener("touchmove", touchMove, {
          passive: false,
        });
        container.addEventListener("touchend", watchTouches);
        container.addEventListener("touchcancel", watchTouches);
      } else if (touch_gesture) {
        endGesture(touch_gesture);
        touch_gesture = null;
        container.removeEventListener("touchmove", touchMove);
        container.removeEventListener("touchend", watchTouches);
        container.removeEventListener("touchcancel", watchTouches);
      }
    },
    { passive: false },
  );
}

function gestureToMatrix(gesture: TouchGesture, origin: Point) {
  return (
    new DOMMatrix()
      .translate(origin.x, origin.y)
      .translate(gesture.translation.x || 0, gesture.translation.y || 0)
      //.rotate(gesture.rotation || 0)
      .scale(gesture.scale || 1)
      .translate(-origin.x, -origin.y)
  );
}

function getOrigin(el: HTMLElement | SVGElement, gesture: TouchGesture) {
  if (el instanceof HTMLElement) {
    let rect = el.getBoundingClientRect();
    return {
      x: gesture.origin.x - rect.x,
      y: gesture.origin.y - rect.y,
    };
  }
  if (el instanceof SVGElement) {
    let matrix = el.ownerSVGElement?.getScreenCTM?.()?.inverse();
    let pt = new DOMPoint(gesture.origin.x, gesture.origin.y);
    return pt.matrixTransform(matrix);
  }
  throw new Error("Expected HTML or SVG element");
}

function applyMatrix(el: HTMLElement | SVGElement, matrix: DOMMatrix) {
  if (el instanceof HTMLElement) {
    el.style.transform = matrix.toString();
    return;
  }
  if (el instanceof SVGElement) {
    el.setAttribute("transform", matrix.toString());
    return;
  }
  throw new Error("Expected HTML or SVG element");
}

export { okzoomer, gestureToMatrix, getOrigin, applyMatrix };
