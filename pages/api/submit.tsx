import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { GetLandsFromAnAddress } from '../../lib/imx'
import { Metadata } from '../../lib/interface'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { address, email: mail, contact, isPublic } = req.body
    const addressRegex = /^0x[a-fA-F0-9]{40}$/
    // verify address is valid
    if (!addressRegex.test(address)) {
      res.status(400).json({
        error: '地址不是合法的以太坊地址'
      })
      return
    }

    let oldRecord
    try {
      oldRecord = await prisma.wallet.findFirst({
        where: { address }
      })
    } catch (error) {
      res.status(500).json({
        error: `数据库连接错误: ${error}`
      })
      return
    }

    const assets = await GetLandsFromAnAddress(address)
    if (assets.length === 0) {
      res.status(200).json({
        message: `地址 ${address} 下没有地块`
      })
      return
    }

    const newLands = assets.map(asset => {
      const [x, y] = (asset.metadata as Metadata).coordinate.split(',')
      return {
        token_address: asset.token_address,
        token_id: parseInt(asset.token_id),
        id: asset.id,
        user: asset.user,
        image_url: asset.image_url,
        x: parseInt(x),
        y: parseInt(y),
        name: asset.name,
        tier: (asset.metadata as Metadata).tier,
        fuels: (asset.metadata as Metadata).fuels,
        solon: (asset.metadata as Metadata).solon,
        carbon: (asset.metadata as Metadata).carbon,
        region: (asset.metadata as Metadata).region,
        crypton: (asset.metadata as Metadata).crypton,
        silicon: (asset.metadata as Metadata).silicon,
        elements: (asset.metadata as Metadata).elements,
        hydrogen: (asset.metadata as Metadata).hydrogen,
        hyperion: (asset.metadata as Metadata).hyperion,
        landmark: (asset.metadata as Metadata).landmark,
        coordinate: (asset.metadata as Metadata).coordinate,
        createdAt: asset.created_at,
        updatedAt: asset.updated_at
      }
    })
    const createNewLands = newLands.map(
      ({ createdAt, updatedAt, ...land }) => land
    )

    if (oldRecord) {
      // delete all lands
      const deletedLands = await prisma.land.deleteMany({
        where: {
          walletAddress: address
        }
      })
      // create new lands
      await prisma.wallet.update({
        where: { address },
        data: {
          balance: {
            create: createNewLands
          }
        }
      })
      const landsCount = await prisma.land.count({
        where: {
          walletAddress: address
        }
      })
      res.status(200).json({
        message: '更新地块成功',
        data: {
          count: landsCount
        }
      })
    } else {
      try {
        const user = await prisma.wallet.create({
          data: {
            address,
            balance: {
              create: createNewLands
            },
            mail,
            contact,
            isPublic: isPublic === 'on' ? true : false
          }
        })
        const landsCount = await prisma.land.count({
          where: {
            walletAddress: address
          }
        })

        res.status(200).json({
          message: '导入地块成功',
          data: { ...user, count: landsCount }
        })
      } catch (error) {
        res.status(500).json({
          message: `数据库连接错误: ${error}`
        })
        return
      }
    }
  }
}
