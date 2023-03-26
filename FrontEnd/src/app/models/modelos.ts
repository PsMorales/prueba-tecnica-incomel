export interface IUsuario {
    id: string;
    nombre: string;
    usuario: string;
    contasenia: string;
    correo: string;
    nacimiento: string;
    agregado_el: string;
    modificado_el: string;
    agregado_por: string;
    modificado_por: string;
    token_contrasenia: string;
    agregado_token_contrasenia: string;
    tiempo_token_contrasenia: number;
    esado: string;
    token: string;
}

export class Usuario implements IUsuario{
    id: string;
    nombre: string;
    usuario: string;
    contasenia: string;
    correo: string;
    nacimiento: string;
    agregado_el: string;
    modificado_el: string;
    agregado_por: string;
    modificado_por: string;
    token_contrasenia: string;
    agregado_token_contrasenia: string;
    tiempo_token_contrasenia: number;
    esado: string;
    token: string;

    constructor(usuario: Usuario){
        if(usuario){
            this.id = usuario.id;
            this.nombre = usuario.nombre;
            this.usuario = usuario.usuario;
            this.contasenia = usuario.contasenia;
            this.correo = usuario.correo;
            this.nacimiento = usuario.nacimiento;
            this.agregado_el = usuario.agregado_el;
            this.modificado_el = usuario.modificado_el;
            this.agregado_por = usuario.agregado_por;
            this.modificado_por = usuario.modificado_por;
            this.token_contrasenia = usuario.token_contrasenia;
            this.agregado_token_contrasenia = usuario.agregado_token_contrasenia;
            this.tiempo_token_contrasenia = usuario.tiempo_token_contrasenia;
            this.esado = usuario.esado;
        }
        else{
            this.id = null;
            this.nombre = null;
            this.usuario = null;
            this.contasenia = null;
            this.correo = null;
            this.nacimiento = null;
            this.agregado_el = null;
            this.modificado_el = null;
            this.agregado_por = null;
            this.modificado_por = null;
            this.token_contrasenia = null;
            this.agregado_token_contrasenia = null;
            this.tiempo_token_contrasenia = null;
            this.esado = null;
            this.token = null;
        }
    }
}

export interface IEmpleado{
    id: string;
    nombre_completo: string;
    dpi: string;
    cantidad_hijos: number;
    salario_base: number;
    bono_decreto: number;
    agregado_por: string;
    modificado_por: string;
    agregado_el: string;
    modificado_el: string;
    estado: string;
    token: string;
}

export class Empleado implements IEmpleado{
    id: string;
    nombre_completo: string;
    dpi: string;
    cantidad_hijos: number;
    salario_base: number;
    bono_decreto: number;
    agregado_por: string;
    modificado_por: string;
    agregado_el: string;
    modificado_el: string;
    estado: string;
    token: string;

    constructor(empleado: Empleado){
        if(empleado){
            this.id = empleado.id;
            this.nombre_completo = empleado.nombre_completo;
            this.dpi = empleado.dpi;
            this.cantidad_hijos = empleado.cantidad_hijos;
            this.salario_base = empleado.salario_base;
            this.bono_decreto = empleado.bono_decreto;
            this.agregado_por = empleado.agregado_por;
            this.modificado_por = empleado.modificado_por;
            this.agregado_el = empleado.agregado_el;
            this.modificado_el = empleado.modificado_el;
            this.estado = empleado.estado;
        }
        else{
            this.id = null;
            this.nombre_completo = null;
            this.dpi = null;
            this.cantidad_hijos = null;
            this.salario_base = null;
            this.bono_decreto = 250.00;
            this.agregado_por = null;
            this.modificado_por = null;
            this.agregado_el = null;
            this.modificado_el = null;
            this.estado = null;
            this.token = null;

        }
    }
}

export interface IInicio{
    contasenia: String;
    correo: string;
}

export class Inicio implements IInicio{
    contasenia: String;
    correo: string;

    constructor(){
        this.contasenia = '';
        this.correo = '';
    }
}

export interface IRecuperar{
    nacimiento: String;
    correo: string;
}

export class Recuperar implements IRecuperar{
    nacimiento: String;
    correo: string;

    constructor(){
        this.nacimiento = '';
        this.correo = '';
    }
}


export interface ICambio{
    token_contrasenia: String;
    contasenia: string;
    contasenia2: string;
}

export class Cambio implements ICambio{
    token_contrasenia: String;
    contasenia: string;
    contasenia2: string;

    constructor(){
        this.token_contrasenia = '';
        this.contasenia = '';
        this.contasenia2 = '';
    }
}


export interface IRegistroInicio{
    resultado: number;
    token: string;
    usuario: string;
}

export class RegistroInicio implements IRegistroInicio{
    resultado: number;
    token: string;
    usuario: string;

    constructor(registroInicio: RegistroInicio){
        if(registroInicio){
            this.resultado = registroInicio.resultado;
            this.token = registroInicio.token;
            this.usuario = registroInicio.usuario;
        }
        else{
            this.resultado = 0;
            this.token = null;
            this.usuario = null;
        }
    }
}