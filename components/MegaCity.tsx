import { useEffect, useState } from 'react'
import Image from 'next/image'

type MegaCityData =
  | [
      {
        region: string
        tier: number
        token_id: number
        user: string
        x: number
        y: number
      }[]
    ]
  | []

type MegaCity = {
  count: number
  data: MegaCityData
}

export default function MegaCity() {
  const [data, setData] = useState<MegaCity>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/megacity?size=2')
      .then(res => res.json())
      .then((data: MegaCity) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div className="w-full pt-6 sm:mt-4">
      <div className="text-lg font-medium leading-6 text-gray-900">
        MegaCity(2x2)统计
      </div>
      {data.data.length === 0 ? (
        <p className="mt-6">暂无megacity</p>
      ) : (
        <div className="mt-4 flex flex-col gap-x-8 gap-y-4">
          {data.data.map((singleMegaCity, megaCityIndex) => (
            <div className="flex flex-row gap-x-4" key={megaCityIndex}>
              <div className="w-4 text-3xl text-gray-500">
                {megaCityIndex + 1}
              </div>
              <div className="grid grid-cols-2 grid-rows-2">
                {singleMegaCity.map((city, cityIndex) => (
                  <div className="h-12" key={cityIndex}>
                    <Image
                      layout="intrinsic"
                      width="48"
                      height="48"
                      src={`/land/tier${city.tier}-small.svg`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {singleMegaCity.map((city, cityIndex) => (
                  <div key={cityIndex} className="flex flex-row gap-x-2">
                    <div className="w-4 flex-none font-light">T{city.tier}</div>
                    <div className="hidden font-bold sm:inline">
                      Plot {city.token_id}
                    </div>
                    <div className="flex-initial">
                      {city.x}, {city.y}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
