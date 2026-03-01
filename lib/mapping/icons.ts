import {
  AlarmClockIcon,
  AwardIcon,
  CalendarIcon,
  CheckCircleIcon,
  CircleQuestionMarkIcon,
  EyeClosedIcon,
  EyeIcon,
  FlagTriangleLeftIcon,
  MailCheckIcon,
  MessageSquareMoreIcon,
  MicIcon,
  Trash2Icon,
  XCircleIcon,
} from "lucide-react";

export const iconsMap = {
  Agenda: CalendarIcon,
  Premio: AwardIcon,
  Check: CheckCircleIcon,
  Duvida: CircleQuestionMarkIcon,
  Mensagem: MessageSquareMoreIcon,
  EmailConfirmado: MailCheckIcon,
  Alarme: AlarmClockIcon,
  Lixeira: Trash2Icon,
  Visualizar: EyeIcon,
  Oculto: EyeClosedIcon,
  Bandeira: FlagTriangleLeftIcon,
  Microfone: MicIcon,
  Cancelar: XCircleIcon,
} as const;

export const iconsMapDb = {
  Agenda: "CALENDAR",
  Premio: "AWARD",
  Check: "CHECK_CIRCLE",
  Duvida: "QUESTION_MARK_CIRCLE",
  Mensagem: "MESSAGE_SQUARE",
  EmailConfirmado: "MAIL_CHECK",
  Alarme: "ALARM_CLOCK",
  Lixeira: "TRASH",
  Visualizar: "EYE",
  Oculto: "EYE_CLOSED",
  Bandeira: "FLAG",
  Microfone: "MIC",
  Cancelar: "X_CIRCLE",
} as const;

export const iconsMapDbInverted = {
  CALENDAR: "Agenda",
  AWARD: "Premio",
  CHECK_CIRCLE: "Check",
  QUESTION_MARK_CIRCLE: "Duvida",
  MESSAGE_SQUARE: "Mensagem",
  MAIL_CHECK: "EmailConfirmado",
  ALARM_CLOCK: "Alarme",
  TRASH: "Lixeira",
  EYE: "Visualizar",
  EYE_CLOSED: "Oculto",
  FLAG: "Bandeira",
  MIC: "Microfone",
  X_CIRCLE: "Cancelar",
} as const;

export const iconsName = Object.keys(iconsMap) as (keyof typeof iconsMap)[];

export const iconsList = Object.entries(iconsMap).map(([name, component]) => ({
  name,
  component,
}));
