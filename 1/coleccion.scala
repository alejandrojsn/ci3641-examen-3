abstract class Coleccion[T] {
    def agregar(elemento: T): Unit
    def remover(elemento: T): Unit
    def vacio(): Boolean
}

class Conjunto[T] extends Coleccion[T] {
    var elementos = List[T]()
    def agregar(elemento: T): Unit = {
        if (!elementos.contains(elemento)) {
            elementos = elementos :+ elemento
        }
    }
    def remover(elemento: T): Unit = {
        if (!elementos.contains(elemento)) {
            throw new Exception("El elemento no existe")
        }
        elementos = elementos diff List(elemento)
    }
    def vacio(): Boolean = {
        return elementos.isEmpty
    }
}

class Bolsa[T] extends Coleccion[T] {
    var elementos = List[T]()
    def agregar(elemento: T): Unit = {
        elementos = elementos :+ elemento
    }
    def remover(elemento: T): Unit = {
        if (!elementos.contains(elemento)) {
            throw new Exception("El elemento no existe")
        }
        elementos = elementos diff List(elemento)
    }
    def vacio(): Boolean = {
        return elementos.isEmpty
    }
}
