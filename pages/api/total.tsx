import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

interface landCount {
  _count: number;
  tier: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await prisma.land.groupBy({
      by: ['tier'],
      _count: true
    });
    const sortResult = result.sort(
      (a: landCount, b: landCount) => a.tier - b.tier
    );
    res.status(200).json(sortResult);
  } catch (error) {
    res.status(500).json({
      error: `database connect error: ${error}`
    });
    return;
  }
};
