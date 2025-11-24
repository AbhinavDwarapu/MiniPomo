"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { TimerMode } from "../mode-toggle";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export function AnimatedCounter({ value, mode }: { value: number; mode: TimerMode }) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  const modeColors = {
    timer: "text-on-primary",
    break: "text-secondary",
    breakPlus: "text-lightGreen",
  };

  return (
    <div
      style={{ fontSize }}
      className={`flex items-center space-x-2 overflow-hidden font-semibold rounded-md px-2 leading-none ${modeColors[mode]} select-none`}
    >
      {/* Minutes */}
      <div className="flex space-x-1">
        <Digit place={10} value={minutes} />
        <Digit place={1} value={minutes} />
      </div>
      {/* Separator */}
      <span className="font-black text-4xl">:</span>
      {/* Seconds */}
      <div className="flex space-x-1">
        <Digit place={10} value={seconds} />
        <Digit place={1} value={seconds} />
      </div>
    </div>
  );
}

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 300,
    damping: 30,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums text-[3.5rem]">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}