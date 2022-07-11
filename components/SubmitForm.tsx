import { useState } from 'react'
import Router from 'next/router'

type Content = {
  data: Record<string, unknown>
  message: string
}

export default function SubmitForm() {
  const [mail, setMail] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setaddress] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      if (mail === '') {
        alert(`请输入Email`)
        return
      }
      if (name === '') {
        alert(`请输入称呼`)
        return
      }
      if (contact === '') {
        alert(`请输入其他联系方式`)
        return
      }
      if (address === '') {
        alert(`请输入以太坊地址`)
        return
      }
      const body = {
        email: mail,
        name,
        contact,
        address,
        isPublic
      }
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const content = (await res.json()) as Content
      if (res.status === 200) {
        alert(`${content.message}，刷新页面查看新数据`)
      } else {
        alert(`${content.message}`)
      }
      setaddress('')
      Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className="flex w-full flex-col px-2 sm:w-1/2"
      onSubmit={submitData}
      method="post"
    >
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4 sm:col-start-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            提交信息，参与ISC公会 illvium Land 的统计
          </h3>
        </div>
        <div className="sm:col-span-4 sm:col-start-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={mail}
              onChange={e => setMail(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-4 sm:col-start-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            称呼
            <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 text-sm text-gray-500">例如 "喵本"</p>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-4 sm:col-start-2">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-700"
          >
            其他联系方式
            <span className="text-red-500">*</span>
          </label>
          <p className="mt-1 text-sm text-gray-500">
            例如 "Discord: 喵本scott | 𓃠 ISC#9964"
          </p>
          <input
            type="text"
            name="contact"
            id="contact"
            autoComplete="contact"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-4 sm:col-start-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            以太坊地址
            <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={e => setaddress(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-4 sm:col-start-2">
          <div className="flex items-center">
            <input
              id="isPublic"
              name="isPublic"
              type="checkbox"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <label
                htmlFor="public"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                是否愿意公开联系方式
              </label>
            </div>
            <div className="ml-auto flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                提交
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
