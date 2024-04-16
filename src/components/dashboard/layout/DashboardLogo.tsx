import { Button } from '@/components/ui/button'
import { Bell, Package2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const DashboardLogo = (props: Props) => {
  return (
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link to={'/'} className="flex items-center gap-2 font-semibold dark:text-gray-300">
                    <Package2 className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                </Link>
                <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto h-8 w-8 dark:bg-slate-50 text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900"
                >
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
  )
}

export default DashboardLogo