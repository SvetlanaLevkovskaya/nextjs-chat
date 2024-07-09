'use client'

import { CrownTwoTone, EllipsisOutlined } from '@ant-design/icons'
import Image from 'next/image'

export const Header = () => (
  <header className="flex justify-between items-center p-3.5 border-b border-gray-200">
    <div className="sm-400:block hidden w-auto h-auto">
      <Image src="/avatar-group.png" alt="avatar-group" width={100} height={50} priority />
    </div>

    <div className="flex flex-col justify-center items-center gap-0.5">
      <div className="flex justify-center items-center gap-2">
        <CrownTwoTone twoToneColor="#eb2f96" />

        <h4 className="font-semibold">Team Unicorns</h4>
      </div>

      <span className="text-neutral-500">last seen 45 minutes ago</span>
    </div>

    <div className="flex cursor-pointer">
      <EllipsisOutlined style={{ color: '#666668' }} />
    </div>
  </header>
)
