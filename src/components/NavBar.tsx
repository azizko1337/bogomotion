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

import type FrontUser from "@/types/FrontUser";

type Props = {
  user: FrontUser;
};

function NavBar(props: Props) {
  const { user } = props;

  return (
    <NavigationMenu className={cn("px-3 py-3")}>
      <div className="w-12 h-12 relative cursor-pointer animate-spin-slow hover:animate-spin">
        <Link href="/" legacyBehavior passHref>
          <Image layout="fill" alt="BOGOLOGO" src="/logo.png" />
        </Link>
      </div>
      <div className="grow"></div>
      <NavigationMenuList>
        {user ? (
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
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
