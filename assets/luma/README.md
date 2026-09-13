# Transición de Luma

El hero de `index.html` combina un paisaje fijo con cuatro recortes WebP transparentes. Un bucle de 16 segundos muestra brujo, niña, adolescente y adulta con IA, con fundidos de un segundo y un pulso verde.

Las imágenes suman 291.314 bytes. Con CSS y JavaScript, los recursos del componente pesan 295.142 bytes, sin dependencias externas añadidas. Las rutas relativas funcionan también al publicar la página en una subcarpeta.

El componente reserva su tamaño, pausa fuera de pantalla y en pestañas ocultas, y ofrece un botón de pausa. Con `prefers-reduced-motion` se muestra la adulta y se omite la descarga de los otros tres personajes. Sin JavaScript también se muestra la adulta.

Para cambiar los tiempos, editar los fotogramas y duraciones en `luma.js`. La posición de los personajes está en `luma.css`; el paisaje no participa en la animación. Las imágenes se prepararon con ImageGen a partir de las ilustraciones de Luma y se comprimieron en WebP.
