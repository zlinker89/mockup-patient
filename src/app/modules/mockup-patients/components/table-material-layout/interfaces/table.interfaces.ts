
export interface ColumnTableMaterialLayout{
  label: string
  nameVar: string
  options?: OptionColumn[]
}
export interface TableEvent{
  data: any,
  action: string
}
export enum ColorButtom{
  PRIMARY = "primary",
  ACCENT = "accent",
  WARN = "warn",
  BASIC = "",
}
export enum TypeOption{
  BUTTON = "BUTTON",
  BUTTON_ICON = "BUTTON_ICON"
}
interface OptionColumn{
  label: string
  icon: string
  colorButtom: ColorButtom
  type: TypeOption
  action: string
}
