import React from 'react'

import { NavBar, MobileNavBar } from '@/features/navbar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <main className="bg-stone-100 grid gap-4 grid-cols-1 md:grid-cols-[230px_1fr] h-full md:pb-0 pb-[4.5rem]">
            <NavBar />
            <MobileNavBar />
            <Outlet />
        </main>
    )
}
