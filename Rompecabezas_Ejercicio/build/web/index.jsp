<%-- 
    Document   : index
    Created on : 27 ago 2025, 07:47:31
    Author     : informatica
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="css/estilo.css"
              <title>Rompecabezas 4x4 con Imagen</title>

    </head>
    <body>

        <div class="app">
            <section class="panel">
                <div class="header">
                    <div class="title">
                        <span class="badge">4x4</span>
                        <h2>Rompecabezas deslizante</h2>
                    </div>
                    <div class="controls">
                        <button id="btnReiniciar" class="primary">Reiniciar</button>
                        <button id="btnAyuda" class="ghost" aria-pressed="false">
                            Mostrar números
                        </button>
                        <button id="btnTiempo" class="ghost" aria-pressed="false">
                            Tiempo: Infinito
                        </button>
                    </div>
                </div>

                <div class="stats">
                    <div class="stat">
                        <div class="label">Tiempo</div>
                        <div id="tiempo" class="value">00:00</div>
                    </div>
                    <div class="stat">
                        <div class="label">Movimientos</div>
                        <div id="movs" class="value">0</div>
                    </div>
                    <div class="stat">
                        <div class="label">Mejor</div>
                        <div id="mejor" class="value">—</div>
                    </div>
                </div>

                <div class="board-wrap">
                    <div id="board" class="board"></div>
                    <div id="mensaje" class="msg"></div>
                </div>
            </section>

            <aside class="panel ref">
                <div class="header" style="margin-bottom: 0">
                    <div class="title">
                        <span class="badge">Referencia</span>
                        <h2 style="font-size: 20px">Imagen objetivo</h2>
                    </div>
                </div>
                <div id="refImg" class="imgbox"></div>

                <div class="meta">
                    <button id="btnBarajar" class="primary">Barajar</button>
                    <button id="btnResolver" class="ghost">Resolver</button>
                </div>
            </aside>
        </div>

        <script src="js/script.js"></script>
    </body>
</html>
