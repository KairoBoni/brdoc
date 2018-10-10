export function setDoc(nota, comentario, qtd) {
    return {
        type: "INSERT",
        nota: nota,
        comentario: comentario,
        qtd: qtd
    }
}