"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import ListItem from "./ListItem"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Navbar() {
    return (
        <div className="flex justify-center h-12 translate-y-2">
            <NavigationMenu className="border rounded p-4 h-14">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Caddy</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                <ListItem
                                    title="Route Manager"
                                    href={'/'}>
                                    Easy add, edit, and delete routes all from one place.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Panel</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                <ListItem
                                    title="Route Manager"
                                    href={'/'}>
                                    Easy add, edit, and delete routes all from one place.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}