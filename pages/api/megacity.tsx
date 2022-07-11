import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const lands = await prisma.land.findMany({
      select: {
        token_id: true,
        region: true,
        x: true,
        y: true,
        tier: true,
        user: true
      }
    });

    // calculate all 2x2 or 3x3 lands
    // sort lands by x and y
    const sortedLands = lands.sort((a, b) => a.y - b.y || a.x - b.x);
    let megaCity2x2 = [];
    let megaCity3x3 = [];
    if (req.query.size === '2') {
      for (let i = 0; i < sortedLands.length; i++) {
        let current = sortedLands[i];
        let next = sortedLands[i + 1];
        if (next) {
          if (next.x === current.x + 1 && next.y === current.y) {
            const down = sortedLands
              .slice(i)
              .find((item) => item.x === current.x && item.y === current.y + 1);
            if (down) {
              const downRight = sortedLands
                .slice(i)
                .find(
                  (item) => item.x === current.x + 1 && item.y === current.y + 1
                );
              if (downRight) {
                megaCity2x2.push([current, next, down, downRight]);
              }
            }
          }
        }
      }
      res.status(200).json({
        count: megaCity2x2.length,
        data: megaCity2x2
      });
      return;
    }

    if (req.query.size === '3') {
      for (let i = 0; i < sortedLands.length; i++) {
        let l11 = sortedLands[i];
        let l12 = sortedLands[i + 1];
        if (l12) {
          if (l12.x === l11.x + 1 && l12.y === l11.y) {
            const l13 = sortedLands
              .slice(i + 2)
              .find((item) => item.x === l11.x + 2 && item.y === l11.y);
            if (l13) {
              const l21 = sortedLands
                .slice(i + 3)
                .find((item) => item.x === l11.x && item.y === l11.y + 1);
              if (l21) {
                const l22 = sortedLands
                  .slice(i + 4)
                  .find((item) => item.x === l11.x + 1 && item.y === l11.y + 1);
                if (l22) {
                  const l23 = sortedLands
                    .slice(i + 5)
                    .find(
                      (item) => item.x === l11.x + 2 && item.y === l11.y + 1
                    );
                  if (l23) {
                    const l31 = sortedLands
                      .slice(i + 6)
                      .find((item) => item.x === l11.x && item.y === l11.y + 2);
                    if (l31) {
                      const l32 = sortedLands
                        .slice(i + 7)
                        .find(
                          (item) => item.x === l11.x + 1 && item.y === l11.y + 2
                        );
                      if (l32) {
                        const l33 = sortedLands
                          .slice(i + 8)
                          .find(
                            (item) =>
                              item.x === l11.x + 2 && item.y === l11.y + 2
                          );
                        if (l33) {
                          megaCity3x3.push([
                            l11,
                            l12,
                            l13,
                            l21,
                            l22,
                            l23,
                            l31,
                            l32,
                            l33
                          ]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      res.status(200).json({
        count: megaCity3x3.length,
        data: megaCity3x3
      });
      return;
    }

    res.status(400).json({
      error: 'size parameter must be 2 or 3'
    });
  } catch (error) {
    res.status(500).json({
      error: `database connect error: ${error}`
    });
    return;
  }
};
