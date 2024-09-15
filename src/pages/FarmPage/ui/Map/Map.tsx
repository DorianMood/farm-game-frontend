import FarmMap from "shared/assets/images/farm/map.svg?react";
import { Barns } from "./Barns";
import { Beds } from "./Beds";
import { AnimalEnum } from "entities/Inventory";
import { CustomGame } from "./CustomGame.tsx";
import { useLayoutEffect, useRef } from "react";
import {
  Point,
  TouchGesture,
  WheelGesture,
  applyMatrix,
  gestureToMatrix,
  getOrigin,
  okzoomer,
} from "shared/lib/zoom";

interface MapProps {
  onPlantBed: (bedIndex: number) => void;
  onHarvestBed: (bedIndex: number) => void;
  onHarvestAnimal: (animal: AnimalEnum) => void;
  onCompleteTask: (type: string) => void;
}

export const Map = ({
  onPlantBed,
  onHarvestBed,
  onHarvestAnimal,
  onCompleteTask,
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // subscribe on zoom and apply zoom on map
    // unsubscribe and cleanup zoom event
    if (!ref.current) {
      return;
    }

    let origin: Point;
    let initial_ctm = new DOMMatrix();
    let el = ref.current;
    el.style.transformOrigin = "0 0";

    const rect = el.getBoundingClientRect();

    const maxScale = Math.min(
      rect.height / window.innerHeight,
      rect.width / window.innerWidth,
    );

    /*
				Extract the uniform scale component from a DOMMatrix.

				The code is simple because we build the DOMMatrix objects
				ourselves and we don't ever apply a non-uniform scale
				or a skew to the object.

				The general algorithm to extract individual components 
				from a CSS matrix can be found here:

				https://drafts.csswg.org/css-transforms/#decomposing-a-2d-matrix
			 */
    function getScaleFromMatrix(m: DOMMatrix) {
      return Math.hypot(m.a, m.b);
    }

    /*
				Given the element's current transform matrix `m`
				adjust the `gesture` object so that when applied 
				to the element, the element's scale does not go 
				under 0.5%, nor over 200%.
			 */
    function clampScale(gesture: WheelGesture | TouchGesture, m: DOMMatrix) {
      let s = getScaleFromMatrix(m);
      let proposed_scale = gesture.scale * s;

      if (proposed_scale > maxScale || proposed_scale < 0.5) {
        return {
          ...gesture,
          scale: Math.max(0.5, Math.min(2, proposed_scale)) / s,
        };
      }
      return gesture;
    }

    function getTranslationFromMatrix(m: DOMMatrix) {
      return {
        x: m.e,
        y: m.f,
      };
    }
    /*
				Given the element's current transform matrix `m`
				adjust the `gesture` object so that when applied 
				to the element, the element's translation does not go 
				under {0, 0}, nor over {100%, 100%}.
			 */
    function clampTranslation(
      gesture: WheelGesture | TouchGesture,
      m: DOMMatrix,
    ) {
      let t = getTranslationFromMatrix(m);
      let proposed_position = {
        x: gesture.translation.x + t.x,
        y: gesture.translation.y + t.y,
      };

      const rect = el.getBoundingClientRect();

      const maxXOffset = window.innerWidth - (rect?.width ?? 0);
      const maxYOffset = window.innerHeight - (rect?.height ?? 0);

      return {
        ...gesture,
        translation: {
          x:
            proposed_position.x > 0
              ? gesture.translation.x - proposed_position.x
              : proposed_position.x < maxXOffset
                ? gesture.translation.x - (proposed_position.x - maxXOffset)
                : gesture.translation.x,
          y:
            proposed_position.y > 0
              ? gesture.translation.y - proposed_position.y
              : proposed_position.y < maxYOffset
                ? gesture.translation.y - (proposed_position.y - maxYOffset)
                : gesture.translation.y,
        },
      };
    }

    okzoomer(ref.current, {
      startGesture: (gesture) => {
        /*
						Clear the element's transform so we can 
						measure its original position wrt. the screen.

						(We don't need to restore it because it gets 
						overwritten by `applyMatrix()` anyways.)
					 */
        el.style.transform = "";
        gesture = clampScale(gesture, initial_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        origin = getOrigin(el, gesture);
        const ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        applyMatrix(el, ctm);
      },
      doGesture: (gesture) => {
        gesture = clampScale(gesture, initial_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        const ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        applyMatrix(el, ctm);
      },
      endGesture: (gesture) => {
        gesture = clampScale(gesture, initial_ctm);
        gesture = clampTranslation(gesture, initial_ctm);
        initial_ctm = gestureToMatrix(gesture, origin).multiply(initial_ctm);
        applyMatrix(el, initial_ctm);
      },
    });
  }, []);

  return (
    <div ref={ref}>
      <FarmMap />
      <Beds onHarvestClick={onHarvestBed} onPlantClick={onPlantBed} />
      <Barns onHarvestClick={onHarvestAnimal} />
      <CustomGame onCompleteTask={onCompleteTask} />
    </div>
  );
};
