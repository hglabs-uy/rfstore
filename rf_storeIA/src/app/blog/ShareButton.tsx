'use client';

import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export const ShareButton = ({ postUrl, postTitle }: { postUrl: string, postTitle: string }) => {
  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(postTitle)}`;

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en LinkedIn">
        <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary"/>
      </Link>
    </Button>
  );
};
