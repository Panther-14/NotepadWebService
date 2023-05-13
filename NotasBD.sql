-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema blogDeNotas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blogDeNotas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blogDeNotas` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema blogdenotas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema blogdenotas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `blogdenotas` DEFAULT CHARACTER SET utf8 ;
USE `blogDeNotas` ;

-- -----------------------------------------------------
-- Table `blogDeNotas`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogDeNotas`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(100) NULL,
  `apellidos` VARCHAR(100) NULL,
  `tiempoResgistro` DATETIME NULL,
  `activo` TINYINT NULL,
  `celular` VARCHAR(20) NULL,
  `contrasena` VARCHAR(50) NULL,
  `ultimoTokenAcceso` TEXT NULL,
  `tiempoUltimoAcceso` DATETIME NULL,
  `otp` VARCHAR(6) NULL,
  `tiempoActivacion` DATETIME NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogDeNotas`.`libreta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogDeNotas`.`libreta` (
  `idLibreta` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `colorHexadecimal` VARCHAR(20) NULL,
  `usuario_idUsuario` INT NOT NULL,
  PRIMARY KEY (`idLibreta`, `usuario_idUsuario`),
  INDEX `fk_libreta_usuario1_idx` (`usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_libreta_usuario1`
    FOREIGN KEY (`usuario_idUsuario`)
    REFERENCES `blogDeNotas`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogDeNotas`.`prioridad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogDeNotas`.`prioridad` (
  `idPrioridad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  PRIMARY KEY (`idPrioridad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `blogDeNotas`.`nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogDeNotas`.`nota` (
  `idNota` INT NOT NULL AUTO_INCREMENT,
  `libreta_idLibreta` INT NOT NULL,
  `prioridad_idPrioridad` INT NOT NULL,
  `usuario_idUsuario` INT NOT NULL,
  `titulo` VARCHAR(280) NULL,
  `contenido` TEXT NULL,
  `tiempoCreacion` DATETIME NULL,
  `eliminado` TINYINT NULL,
  PRIMARY KEY (`idNota`, `libreta_idLibreta`, `prioridad_idPrioridad`, `usuario_idUsuario`),
  INDEX `fk_nota_libreta_idx` (`libreta_idLibreta` ASC) VISIBLE,
  INDEX `fk_nota_prioridad1_idx` (`prioridad_idPrioridad` ASC) VISIBLE,
  INDEX `fk_nota_usuario1_idx` (`usuario_idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_nota_libreta`
    FOREIGN KEY (`libreta_idLibreta`)
    REFERENCES `blogDeNotas`.`libreta` (`idLibreta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nota_prioridad1`
    FOREIGN KEY (`prioridad_idPrioridad`)
    REFERENCES `blogDeNotas`.`prioridad` (`idPrioridad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nota_usuario1`
    FOREIGN KEY (`usuario_idUsuario`)
    REFERENCES `blogDeNotas`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `blogdenotas` ;

-- -----------------------------------------------------
-- Table `blogdenotas`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogdenotas`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(100) NULL DEFAULT NULL,
  `apellidos` VARCHAR(100) NULL DEFAULT NULL,
  `tiempoRegistro` DATETIME NULL DEFAULT NULL,
  `activo` TINYINT NULL DEFAULT NULL,
  `celular` VARCHAR(20) NULL DEFAULT NULL,
  `contrasena` VARCHAR(50) NULL DEFAULT NULL,
  `ultimoTokenAcceso` TEXT NULL DEFAULT NULL,
  `tiempoUltimoAcceso` DATETIME NULL DEFAULT NULL,
  `otp` VARCHAR(6) NULL DEFAULT NULL,
  `tiempoActivacion` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `blogdenotas`.`libretas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogdenotas`.`libretas` (
  `idLibreta` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  `colorHexadecimal` VARCHAR(20) NULL DEFAULT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`idLibreta`, `idUsuario`),
  INDEX `fk_libreta_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_libreta_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `blogdenotas`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `blogdenotas`.`prioridades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogdenotas`.`prioridades` (
  `idPrioridad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`idPrioridad`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `blogdenotas`.`notas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogdenotas`.`notas` (
  `idNota` INT NOT NULL AUTO_INCREMENT,
  `idLibreta` INT NOT NULL,
  `idPrioridad` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `titulo` VARCHAR(280) NULL DEFAULT NULL,
  `contenido` TEXT NULL DEFAULT NULL,
  `tiempoCreacion` DATETIME NULL DEFAULT NULL,
  `eliminado` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`idNota`, `idLibreta`, `idPrioridad`, `idUsuario`),
  INDEX `fk_nota_libreta_idx` (`idLibreta` ASC) VISIBLE,
  INDEX `fk_nota_prioridad1_idx` (`idPrioridad` ASC) VISIBLE,
  INDEX `fk_nota_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_nota_libreta`
    FOREIGN KEY (`idLibreta`)
    REFERENCES `blogdenotas`.`libretas` (`idLibreta`),
  CONSTRAINT `fk_nota_prioridad1`
    FOREIGN KEY (`idPrioridad`)
    REFERENCES `blogdenotas`.`prioridades` (`idPrioridad`),
  CONSTRAINT `fk_nota_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `blogdenotas`.`usuarios` (`idUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
