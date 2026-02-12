"use client";

import { useState } from "react";

export default function RecursiveGrid() {
    const [grid, setGrid] = useState<number[]>(Array(9).fill(0));
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const handleBoxClick = (index: number) => {
        // Check if box is locked
        if (grid[index] >= 15) return;

        // Trigger click animation
        setClickedIndex(index);
        setTimeout(() => setClickedIndex(null), 200);

        setGrid((prevGrid) => {
            const newGrid = [...prevGrid];

            // Increment the clicked box
            const newValue = newGrid[index] + 1;
            newGrid[index] = newValue;

            // Rule A: If divisible by 3, decrement right neighbor
            if (newValue % 3 === 0) {
                const isRightmostColumn = index % 3 === 2;
                if (!isRightmostColumn) {
                    const rightIndex = index + 1;
                    // Only modify if right neighbor is not locked
                    if (newGrid[rightIndex] < 15) {
                        newGrid[rightIndex] -= 1;
                    }
                }
            }

            // Rule B: If divisible by 5, increment bottom neighbor by 2
            if (newValue % 5 === 0) {
                const isBottomRow = index >= 6;
                if (!isBottomRow) {
                    const bottomIndex = index + 3;
                    // Only modify if bottom neighbor is not locked
                    if (newGrid[bottomIndex] < 15) {
                        newGrid[bottomIndex] += 2;
                    }
                }
            }

            return newGrid;
        });
    };

    const handleReset = () => {
        setGrid(Array(9).fill(0));
        setClickedIndex(null);
    };

    const getBoxStyle = (value: number, index: number) => {
        const isClicked = clickedIndex === index;
        const baseTransition = "transition-all duration-200 ease-in-out";
        const scaleEffect = isClicked ? "scale-90" : "scale-100";

        if (value >= 15) {
            return `bg-red-600 text-white cursor-not-allowed opacity-90 ${baseTransition} ${scaleEffect}`;
        } else if (value % 2 === 0) {
            return `bg-[#e0e0e0] text-gray-800 cursor-pointer hover:bg-gray-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 ${baseTransition} ${scaleEffect}`;
        } else {
            return `bg-[#1a237e] text-white cursor-pointer hover:bg-[#3949ab] hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 ${baseTransition} ${scaleEffect}`;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="grid grid-cols-3 gap-4 p-8 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
                {grid.map((value, index) => (
                    <button
                        key={index}
                        onClick={() => handleBoxClick(index)}
                        disabled={value >= 15}
                        className={`
              w-24 h-24 
              flex items-center justify-center 
              text-3xl font-bold 
              rounded 
              ${getBoxStyle(value, index)}
            `}
                        style={{
                            boxShadow: value >= 15 ? "2px 2px 0px #7f1d1d" : "2px 2px 0px black",
                        }}
                    >
                        {value}
                    </button>
                ))}
            </div>

            <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
                🔄 Reset Grid
            </button>

            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
                <h2 className="text-xl font-bold mb-3 text-gray-800">Rules</h2>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start">
                        <span className="mr-2">🔵</span>
                        <span>Click a box to increment by 1</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">➡️</span>
                        <span>Divisible by 3? Right neighbor -1</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">⬇️</span>
                        <span>Divisible by 5? Bottom neighbor +2</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">🔒</span>
                        <span>Value ≥ 15? Box locks (red & unclickable)</span>
                    </li>
                    <li className="flex items-start">
                        <span className="mr-2">💡</span>
                        <span>Negative values are allowed</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
