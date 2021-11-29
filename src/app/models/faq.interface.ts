//id de pregunta p/ interfaz

export interface IdPregunta extends pregunta {
    id: string
}

//interfaz de preguntas
export interface pregunta {
    title: string,
    description: string
}
