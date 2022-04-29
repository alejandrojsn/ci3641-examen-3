class Grafo(val adyacencias: Map[Int, List[Int]]) {
    abstract class Busqueda {
        def buscar(D: Int, H: Int): Int
    }

    class DFS extends Busqueda {
        var visitados = List[Int]()

        def buscar(D: Int, H: Int): Int = _buscar(D, H, 0)

        private def _buscar(D: Int, H: Int, acc: Int): Int = {
            if (D == H) {
                return acc
            }

            visitados +:= D

            for (v <- adyacencias(D)) {
                if (!visitados.contains(v)) {
                    val r = _buscar(v, H, acc + 1)
                    if (r != -1) {
                        return r
                    }
                }
            }

            visitados = visitados.tail
            
            return -1
        }
    }

    class BFS extends Busqueda {
        var porVisitar = List[Int]()
        var visitados = List[Int]()

        def buscar(D: Int, H: Int): Int =  {
            var acc = 0
            porVisitar :+= D

            while(!porVisitar.isEmpty) {
                var currentLevel = porVisitar
                porVisitar = List[Int]()

                for (x <- currentLevel) {
                    if (x == H) {
                        return acc
                    }

                    visitados :+= x
                }

                acc += 1

                for(x <- currentLevel) {
                    val vs = adyacencias(x)

                    for(v <- vs) {
                        if (!porVisitar.contains(v) && !visitados.contains(v)){
                            porVisitar :+= v
                        }
                    }
                }
            }

            return -1
        }
    }
}