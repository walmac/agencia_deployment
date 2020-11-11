import {Testimonial} from '../models/Testimoniales.js'

const  guardarTestimonial = async (req, res) => {

    const {nombre, correo, mensaje} = req.body;

    const errores = []; 
    if(nombre.trim()=== ''){
        errores.push('El nombre esta vacio');
    }
    if(correo.trim()=== ''){
        errores.push('El correo esta vacio');
    }
    if(mensaje.trim()=== ''){
        errores.push('El mensaje esta vacio');
    }

    if (errores.length >0){
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
        res.redirect('testimoniales');
    }else{
         try {
             await Testimonial.create({
                 nombre,
                 correo,
                 mensaje
             })
         } catch (error) {
             console.log(error);
         }
    }

    
}

export {
    guardarTestimonial
}