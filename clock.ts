import { Temporal } from "https://esm.sh/@js-temporal/polyfill@0.4.4";

export interface CityTime {
  city: string;
  country: string;
  timezone: string;
  time: string;
  hour: number;
  minute: string;
  second: string;
  dayPeriod: string;
  date: string;
}

const CITIES = [
  { city: "Madrid", country: "España", timezone: "Europe/Madrid" },
  { city: "New York", country: "EE.UU.", timezone: "America/New_York" },
  { city: "Londres", country: "Reino Unido", timezone: "Europe/London" },
  { city: "Tokio", country: "Japón", timezone: "Asia/Tokyo" },
  { city: "Sydney", country: "Australia", timezone: "Australia/Sydney" },
  { city: "São Paulo", country: "Brasil", timezone: "America/Sao_Paulo" },
] as const;

export function getWorldTime(): CityTime[] {
  const now = Temporal.Now.zonedDateTimeISO();

  return CITIES.map(({ city, country, timezone }) => {
    const zonedTime = now.withTimeZone(timezone);

    return {
      city,
      country,
      timezone,
      time: `${zonedTime.toLocaleString("es-ES")} (${zonedTime.offset})`,
      hour: zonedTime.hour,
      minute: zonedTime.minute.toString().padStart(2, "0"),
      second: zonedTime.second.toString().padStart(2, "0"),
      dayPeriod: zonedTime.hour < 12 ? "AM" : "PM",
      date: zonedTime.toLocaleString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  });
}

export function getTimezoneInfo(timezone: string): {
  offset: string;
  country: string;
} {
  const now = Temporal.Now.zonedDateTimeISO(timezone);
  const offset = now.offset;

  return {
    offset,
    country: timezone.split("/")[0] || "Unknown",
  };
}
