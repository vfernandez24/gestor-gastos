import { Settings } from "./data/settingsData";

export default function f(settings: Settings, fecha: string) {
  const [anio, mes, dia] = fecha.split("-");

  switch (settings.formatoFecha) {
    case "DD/MM/AAAA":
      return (String(dia + "-" + mes + "-" + anio));
    case "MM/DD/AAAA":
      return (String(mes + "-" + dia + "-" + anio));
    case "AAAA/DD/MM":
      return (String(anio + "-" + dia + "-" + mes));
  }
}
