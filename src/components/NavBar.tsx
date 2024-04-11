"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import type FrontendUser from "@/types/FrontendUser";

type Props = {
  user: FrontendUser;
};

function NavBar(props: Props) {
  const { user } = props;

  return (
    <NavigationMenu className={cn("px-3 py-3 bg-orange-300")}>
      <div className="group hover:bg-orange-200 rounded-lg h-[50px] cursor-pointer hover:shadow-2xl">
        <Link href="/" legacyBehavior passHref>
          <div>
            <div className="animate-spin-slow w-12 h-12 relative group-hover:animate-spin">
              <Image fill alt="BOGOLOGO" src="/logo.png" />
            </div>
            <div className="ho!animation-none content-center text-center w-[130px] h-[30px] ml-[55px] mt-[-37px] font-bold">
              BOGOMOTION
            </div>
          </div>
        </Link>
      </div>
      <div className="grow"></div>
      <NavigationMenuList>
        {user ? (
          <>
            <NavigationMenuItem>
              <Link href="/stats" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Statistics
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/history" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Training history
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <Link href="/auth/login" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Zaloguj
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/auth/register" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Zarejestruj
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
