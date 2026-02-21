import { getPots } from "@/lib/db/pots";
import PotClient from "./PotClient";

export default async function Pots() {
  const pots = await getPots();

  return <PotClient pots={pots} />;
}
