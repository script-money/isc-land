import router from 'next/router'
import { useEffect, useState } from 'react'

type Total = {
  _count: number
  tier: number
}[]

export default function Total() {
  const [data, setData] = useState<Total>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('api/total')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div>
      <div className="text-lg font-medium leading-6 text-gray-900">共计</div>
      {data.length === 0 ? (
        <p className="mt-6">暂无地块</p>
      ) : (
        <div className="mt-6 flex flex-row gap-x-6">
          {data.map((item, index) => (
            <div key={index}>
              <h3>T{item.tier}</h3>
              <p className="text-xl text-gray-600">{item._count}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
