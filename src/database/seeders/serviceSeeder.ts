
import { Service } from "../../models/Service";

// Creamos los 5 Services necesarios
export const seederServices = async () => {

    const Service1 = new Service()
    Service1.serviceName = `Custom tattoos`
    Service1.description = `In this service, clients have the opportunity to create a completely personalized tattoo design, tailored to their tastes and preferences. We work closely with each client, allowing them to select unique motifs, styles and elements that reflect their personality. Our artists strive to realize the client's vision, ensuring a unique and meaningful tattoo experience.`
    await Service1.save()

    const Service2 = new Service()
    Service2.serviceName = `Catalog Tattoos`
    Service2.description = `We offer a wide range of pre-made designs in our catalog for those who prefer proven and stylish options. Customers can explore a variety of options, from classic styles to contemporary designs. Our catalog is a source of inspiration for those looking for tattoos with a unique and artistic touch, providing a diverse selection to satisfy different tastes and styles.
    `
    await Service2.save()

    const Service3 = new Service()
    Service3.serviceName = `Restoration and Rejuvenation of Works`
    Service3.description = `We specialize in improving and renewing existing tattoos. Our team of experts works to restore the vibrancy of old tattoos that may have lost their shine over time. We offer touch-up, color correction and detail enhancement services to ensure the tattoo looks fresh and vibrant. This service is ideal for those who want to revitalize an existing tattoo or correct previous work.
    `
    await Service3.save()

    const Service4 = new Service()
    Service4.serviceName = `Placement of Piercings and Dilators`
    Service4.description = `We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to meet our clients' individual preferences.`
    await Service4.save()

    const Service5 = new Service()
    Service5.serviceName = `Sale of Piercings and Other Items`
    Service5.description = `In addition to our application services, we offer a selection of piercings and other body art related items. Our store provides customers with the opportunity to purchase high-quality products that complement their unique style. From specialized jewelry to aftercare products, we strive to offer a diverse range of items to meet the needs and preferences of our customers, both during and after the body modification process.`
    await Service5.save()

    console.log(`---------------------------`);
    console.log(`Test services have been generated succesfully!`);
    console.log(`---------------------------`);
}