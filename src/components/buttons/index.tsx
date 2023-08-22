"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RedirectButton({
  children,
  dest,
  className,
}: {
  children: React.ReactElement | string;
  dest: string;
  className?: string;
}) {
  const router = useRouter();

  function redirectTo() {
    router.push(dest);
  }
  return (
    <Button variant="outlined" className={className} onClick={redirectTo}>
      <p>{children}</p>
    </Button>
  );
}
