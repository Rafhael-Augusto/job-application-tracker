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

export const iconsName = Object.keys(iconsMap) as (keyof typeof iconsMap)[];

export const iconsList = Object.entries(iconsMap).map(([name, component]) => ({
  name,
  component,
}));
