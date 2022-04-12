import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function FolderView() {
  const router = useRouter();
  const { item } = router.query;
  return (
    <Stack>
      <Heading>edit {item}</Heading>
    </Stack>
  );
}
