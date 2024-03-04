
import { Service } from "../../models/Service";


export const seederServices = async () => {

    const Service1 = new Service()
    Service1.serviceName = `Tatuajes personalizados`
    Service1.description = `En este servicio, los clientes tienen la oportunidad de crear un diseño de tatuaje completamente personalizado, adaptado a sus gustos y preferencias. Trabajamos estrechamente con cada cliente, permitiéndoles seleccionar motivos, estilos y elementos únicos que reflejen su personalidad. Nuestros artistas se esfuerzan por materializar la visión del cliente, garantizando una experiencia de tatuaje única y significativa.`
    await Service1.save()

    const Service2 = new Service()
    Service2.serviceName = `Tatuajes del Catálogo`
    Service2.description = `Ofrecemos una amplia gama de diseños predefinidos en nuestro catálogo para aquellos que prefieren opciones probadas y estilizadas. Los clientes pueden explorar una variedad de opciones, desde estilos clásicos hasta diseños contemporáneos. Nuestro catálogo es una fuente de inspiración para aquellos que buscan tatuajes con un toque único y artístico, proporcionando una selección diversa para satisfacer diferentes gustos y estilos.`
    await Service2.save()

    const Service3 = new Service()
    Service3.serviceName = `Restauración y Rejuvenecimiento de Trabajos`
    Service3.description = `Nos especializamos en mejorar y renovar tatuajes existentes. Nuestro equipo de expertos trabaja para restaurar la vitalidad de tatuajes antiguos que puedan haber perdido su brillo con el tiempo. Ofrecemos servicios de retoque, corrección de colores y realce de detalles para asegurar que el tatuaje luzca fresco y vibrante. Este servicio es ideal para aquellos que desean revitalizar un tatuaje existente o corregir trabajos previos.`
    await Service3.save()

    const Service4 = new Service()
    Service4.serviceName = `Colocación de Piercings y Dilatadores`
    Service4.description = `Nos especializamos en mejorar y renovar tatuajes existentes. Nuestro equipo de expertos trabaja para restaurar la vitalidad de tatuajes antiguos que puedan haber perdido su brillo con el tiempo. Ofrecemos servicios de retoque, corrección de colores y realce de detalles para asegurar que el tatuaje luzca fresco y vibrante. Este servicio es ideal para aquellos que desean revitalizar un tatuaje existente o corregir trabajos previos.`
    await Service4.save()

    const Service5 = new Service()
    Service5.serviceName = `Venta de Piercings y Otros Artículos`
    Service5.description = `Además de nuestros servicios de aplicación, ofrecemos una selección de piercings y otros artículos relacionados con el arte corporal. Nuestra tienda proporciona a los clientes la oportunidad de adquirir productos de alta calidad que complementan su estilo único. Desde joyería especializada hasta productos de cuidado posterior, nos esforzamos por ofrecer una gama diversa de artículos para satisfacer las necesidades y preferencias de nuestros clientes, tanto durante como después del proceso de modificación corporal.`
    await Service5.save()

    console.log(`---------------------------`);
    console.log(`Test services have been generated succesfully!`);
    console.log(`---------------------------`);
}