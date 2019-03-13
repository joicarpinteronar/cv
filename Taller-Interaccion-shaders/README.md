# Taller Interaction/Shaders

## Objetivos

* Implementar interactividad por medio de un dispositivo móvil.

* Desarrollar shaders de luz y textura para los objetos de la aplicación.

## Discusión

Se dasarrolló aplicación móvil basada en el sistema solar, la cual permite interactuar con el sistema, 
implementando interactividad por medio de la pantalla táctil del celilar como también shaders de textura y luz.

### Interactividad

 Con el fin de proveer interactividad en la aplicación, se utilziaron las diferentes opciones que ofrece el celular con la pantalla táctil. 
 De esta manera la aplicación permite realizar zoom a los elementos  del sistema y cambiar la orientación del movimiento

### Shaders

  Se implementaron dos tipos de shaders.
  
  * Light Shader: Para implementar el shader de light en la aplicación, usamos el sol como punto de luz para iluminar
  a los demas planetas utilizando luz difusa por vertice. 
  
      ![Light](http://visualcomputing.github.io/Shaders/fig/vertlight.png)
 
 * Texture Shader: Para implementar el shader de textura en la aplicación, a cada planeta y al sol le agregamos la textura
 tomada de internet, usamos textura simple pasando los datos a traves de los shaders, tomando como referencia el ejemplo 
 visto en clase.
 
      ![Texture](http://visualcomputing.github.io/Shaders/fig/chowmein.png)
 
### Resultados

Al realizar las implementaciones previstas, obtuvimos los resultados esperados tanto en interactividad como en Shaders y con la
ayuda de la librería del curso frames, para separar los diferentes objetos del sistema por medio de Frames. Las siguientes
pantallas muestran el resultado final de la aplicación:

![App1](https://github.com/juanescai/VisualComputing/blob/master/Interaction%20-%20Shaders/Img1.png)

![App2](https://github.com/juanescai/VisualComputing/blob/master/Interaction%20-%20Shaders/Img2.png)

![App3](https://github.com/juanescai/VisualComputing/blob/master/Interaction%20-%20Shaders/Img3.png)
    
### Trabajo futuro
 * Lograr que los planetas se puedan poner como punto central.
 * Utilizar filtros y diferentes texturas en la aplicación 
 
## Integrantes

Máximo 3.

Complete la tabla:

| Integrante | github nick |
|------------|-------------|
| Juan Esteban Caicedo | [juanescai](https://github.com/juanescai) |
| Jose Iván Carpintero | [joicarpinteronar](https://github.com/joicarpinteronar) |

### References

1. [VisualComputing - Interaction](http://visualcomputing.github.io/Interaction).
1. [VisualComputing - Shaders](http://visualcomputing.github.io/Shaders).
2. [Processing Shaders Tutorial - Andres Colubri](https://processing.org/tutorials/pshader/).
3. [Processing for android](http://android.processing.org/)
