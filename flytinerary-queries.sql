CREATE TABLE `flytinerary`.`airports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `iata` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NULL,
  `lat` FLOAT NOT NULL,
  `lon` FLOAT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`, `iata`));