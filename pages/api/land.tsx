import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.query.tokenId) {
      const contactInfo = await prisma.land.findUnique({
        select: {
          user: true,
          Wallet: {
            select: {
              mail: true,
              isPublic: true,
              contact: true
            }
          }
        },
        where: {
          token_id: parseInt(req.query.tokenId as string)
        }
      });

      if (contactInfo === null) {
        res.status(400).json({
          message: 'no land found'
        });
        return;
      }
      if (contactInfo.Wallet.isPublic) {
        res.status(200).json(contactInfo);
        return;
      } else {
        res.status(200).json({
          message: 'private user'
        });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({
      error: `database connect error: ${error}`
    });
    return;
  }
};
