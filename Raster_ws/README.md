# Taller raster

## Propósito

Comprender algunos aspectos fundamentales del paradigma de rasterización.

## Tareas

Emplee coordenadas baricéntricas para:

1. Rasterizar un triángulo; y,
2. Sombrear su superficie a partir de los colores de sus vértices.

Referencias:

* [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/)
* [Rasterization stage](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage)

Opcionales:

1. Implementar un [algoritmo de anti-aliasing](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-practical-implementation) para sus aristas; y,
2. Sombrear su superficie mediante su [mapa de profundidad](https://en.wikipedia.org/wiki/Depth_map).

Implemente la función ```triangleRaster()``` del sketch adjunto para tal efecto, requiere la librería [frames](https://github.com/VisualComputing/frames/releases).

## Integrantes

Dos, o máximo tres si van a realizar al menos un opcional.

Complete la tabla:

| Integrante          | github nick                                       |
|---------------------|---------------------------------------------------|
| Jose Ivan Carpintero| https://github.com/joicarpinteronar/cv            |

## Discusión

Describa los resultados obtenidos. En el caso de anti-aliasing describir las técnicas exploradas, citando las referencias.

En el desarrollo del Taller, lo que primero realicé fue rasterizar el tringulo, evaluando si el centro del pixel estaba dentro o fuera de la figura, de ahi implemente el sombreado de su superficie a partir de los colores de sus vertices, la idea de rasterización se realizo con la implementacion de coordenadas Baricéntricas. Esta implementacion se llevó a cabo con base de las siguientes referencias : 

https://www.scratchapixel.com/lessons/3d-basic-rendering/ray-tracing-rendering-a-triangle/barycentric-coordinates
https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation
http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
https://www.openprocessing.org/sketch/187087

Y como opcional implemente el Algoritmo de anti-aliasing para sus aristas, se implemento por medio de la subdivisión de pixeles dados en la grilla original, para hacer la subdivisión pixel a pixel, se tuvo en cuenta los pixeles que ya estaban coloreados de blanco, el efecto se ve presente presionando la tecla "a", como referencia tuve en cuenta los siguientes enlaces:

https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-practical-implementation
https://docplayer.es/50516078-Algoritmos-de-antialiasing.html
https://learnopengl.com/Advanced-OpenGL/Anti-Aliasing





 




## Entrega

* Modo de entrega: [Fork](https://help.github.com/articles/fork-a-repo/) la plantilla en las cuentas de los integrantes.
* Plazo: 30/9/18 a las 24h.
