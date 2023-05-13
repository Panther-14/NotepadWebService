module.exports = class Usuario {
  constructor(nombres, apellidos, tiempoRegistro, activo, celular, contrasena, ultimoTokenAcceso, tiempoUltimoAcceso, otp, tiempoActivacion) {
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.tiempoRegistro = tiempoRegistro;
    this.activo = activo;
    this.celular = celular;
    this.contrasena = contrasena;
    this.ultimoTokenAcceso = ultimoTokenAcceso;
    this.tiempoUltimoAcceso = tiempoUltimoAcceso;
    this.otp = otp;
    this.tiempoActivacion = tiempoActivacion;
  }
}
