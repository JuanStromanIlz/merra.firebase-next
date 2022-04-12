import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function FolderView() {
  const router = useRouter();
  const { folder } = router.query;
  return (
    <Stack>
      <Heading>carpeta {folder}</Heading>
    </Stack>
  );
}
