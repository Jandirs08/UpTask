//Le estás pasando un string para el titulo, pero tú le pasas llave de objeto, por eso se le pone el type le mandas la llave con string
export const statusTranslations: { [key: string]: string } = {
  pending: "Pendiente",
  onHold: "En espera",
  inProgress: "En progreso",
  underReview: "En revisión",
  completed: "Completado"
};
