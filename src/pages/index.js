import { Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Stack>
      <Link href="newFolder">Nueva carpeta</Link>
      <Link href="/folder/numero">Nueva carpeta</Link>
      <Link href="/folder/otra">Nueva carpeta</Link>
    </Stack>
  );
}
