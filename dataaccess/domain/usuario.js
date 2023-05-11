module.exports = class Usuario {
  constructor(nombre, apellidos, tiempoRegistro, activo, celular, contrasenia, ultimoTokenAcceso, tiempoUltimoAcceso, otp, tiempoActivacion) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.tiempoRegistro = tiempoRegistro;
    this.activo = activo;
    this.celular = celular;
    this.contrasenia = contrasenia;
    this.ultimoTokenAcceso = ultimoTokenAcceso;
    this.tiempoUltimoAcceso = tiempoUltimoAcceso;
    this.otp = otp;
    this.tiempoActivacion = tiempoActivacion;
  }
}
