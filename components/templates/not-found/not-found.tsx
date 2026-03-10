'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { DIGITS } from '@/constants/media.ts';
import styles from '@/components/features/NotFound.module.css';

const FIXED_COLS = 30;
const FIXED_ROWS = 15;
const MAX_TILE_WIDTH = 32;
const ASPECT_RATIO = 38 / 32;
const TILE_COLS = 4;
const TILE_ROWS = 7;
const DIGIT_SPACING = 2;

export default function NotFoundPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const activeSetRef = useRef<Set<string>>(new Set());
  const tileSizeRef = useRef({ width: MAX_TILE_WIDTH, height: MAX_TILE_WIDTH * ASPECT_RATIO });

  const [gridSize, setGridSize] = useState({
    cols: FIXED_COLS,
    rows: FIXED_ROWS,
    width: 0,
    height: 0,
    tileSize: MAX_TILE_WIDTH,
    offsetX: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const isMobile = screenWidth <= 768;

      const tileW = screenWidth / (isMobile ? FIXED_COLS - 10 : FIXED_COLS);
      const tileH = screenHeight / FIXED_ROWS;
      const tileSize = Math.min(tileW, tileH / ASPECT_RATIO, MAX_TILE_WIDTH);

      const gridPixelWidth = FIXED_COLS * tileSize;
      const offsetX = isMobile ? (gridPixelWidth - screenWidth) / 2 : 0;

      tileSizeRef.current = {
        width: tileSize,
        height: tileSize * ASPECT_RATIO,
      };

      setGridSize({
        cols: FIXED_COLS,
        rows: FIXED_ROWS,
        width: gridPixelWidth,
        height: FIXED_ROWS * tileSize * ASPECT_RATIO,
        tileSize,
        offsetX,
      });

      const activeSet = new Set<string>();
      const startCol = Math.floor((FIXED_COLS - (TILE_COLS * 3 + DIGIT_SPACING * 2)) / 2);
      const startRow = Math.floor((FIXED_ROWS - TILE_ROWS) / 2);

      ['4', '0', '4'].forEach((digit, dIndex) => {
        DIGITS[digit as '4' | '0'].forEach((rowStr, y) => {
          rowStr.split('').forEach((cell, x) => {
            if (cell === '1') {
              const col = startCol + dIndex * (TILE_COLS + DIGIT_SPACING) + x;
              const row = startRow + y;
              activeSet.add(`${col}-${row}`);
            }
          });
        });
      });

      activeSetRef.current = activeSet;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tiles = [];
  for (let y = 0; y < gridSize.rows; y++) {
    for (let x = 0; x < gridSize.cols; x++) {
      const key = `${x}-${y}`;
      const isActive = activeSetRef.current.has(key);

      tiles.push(
        <rect
          key={key}
          x={x * gridSize.tileSize + 4 - gridSize.offsetX}
          y={y * gridSize.tileSize * ASPECT_RATIO + 4}
          width={gridSize.tileSize - 8}
          height={gridSize.tileSize * ASPECT_RATIO - 8}
          rx={(gridSize.tileSize - 8) * 0.1}
          className={`${styles.tile} ${isActive ? styles.active : styles.inactive}`}
        />,
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollOuter}>
        <svg
          ref={svgRef}
          width={gridSize.width}
          height={gridSize.height}
          viewBox={`0 0 ${gridSize.width} ${gridSize.height}`}
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          {tiles}
        </svg>
      </div>
      <div className={styles.message}>
        페이지를 찾을 수 없습니다. <Link href="/blog/public">홈으로</Link>
      </div>
    </div>
  );
}
