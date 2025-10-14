"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  className?: string;
  showSocial?: boolean;
  showHeader?: boolean;
};

export const CardWrapper = ({
  children,
  headerLabel = "",
  backButtonLabel = "",
  backButtonHref = "",
  showSocial = true,
  showHeader = true,
  className = "w-[400px]"
}: CardWrapperProps) => {
  return (
    <Card className={cn(
      "shadow-md",
      className
    )}>
      {showHeader && (
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  );
};
