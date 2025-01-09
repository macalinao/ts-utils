import type { RawBuilder } from "kysely";
import { sql } from "kysely";

export interface Coords {
  lat: number;
  lng: number;
}

export const geog = (coords: Coords): RawBuilder<string> =>
  sql`ST_SetSRID(ST_Point(${coords.lng}::decimal, ${coords.lat}::decimal), 4326)`;
