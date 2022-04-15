import { Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Stack>
      <Heading>Index</Heading>
      <video
        controls
        src="https://firebasestorage.googleapis.com/v0/b/merra-firebase-next.appspot.com/o/escena%201.mp4?alt=media&token=45468d92-2bd8-46b1-8774-684d98674e29"
      />
    </Stack>
  );
}
