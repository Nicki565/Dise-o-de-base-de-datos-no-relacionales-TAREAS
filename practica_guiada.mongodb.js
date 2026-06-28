//Seleccionar la Base de Datos
use ('gestion_academica');

//Ejercicio 01: Mostrar las calificaciones junto con los nombres de los estudiantes
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "carnet_estudiante",
      foreignField: "carnet",
      as: "estudiante"
    }
  },
  {
    $unwind: "$estudiante"
  },
  {
    $project: {
      _id: 0,
      estudiante: {
        $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"]
      },
      nota: 1
    }
  }
])

//Ejercicio 02: Mostrar únicamente las calificaciones mayores o iguales a 9 junto con el nombre del estudiante
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "carnet_estudiante",
      foreignField: "carnet",
      as: "estudiante"
    }
  },
  {
    $unwind: "$estudiante"
  },
  {
    $match: {
      nota: { $gte: 9 }
    }
  },
  {
    $project: {
      _id: 0,
      estudiante: {
        $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"]
      },
      nota: 1
    }
  }
])

//Ejercicio 03: Mostrar los grupos junto con el nombre de la materia
db.grupos.aggregate([
  {
    $lookup: {
      from: "materias",
      localField: "materia_codigo",
      foreignField: "codigo",
      as: "materia"
    }
  },
  {
    $unwind: "$materia"
  },
  {
    $project: {
      _id: 0,
      codigo_grupo: 1,
      nombre_materia: "$materia.nombre",
      turno: 1
    }
  }
])

//Ejercicio 04: Mostrar los estudiantes de San Miguel con el nombre de su carrera
db.estudiantes.aggregate([
  {
    $lookup: {
      from: "carreras",
      localField: "carrera_codigo",
      foreignField: "codigo",
      as: "carrera"
    }
  },
  {
    $unwind: "$carrera"
  },
  {
    $match: {
      "direccion.departamento": "San Miguel"
    }
  },
  {
    $project: {
      _id: 0,
      nombres: 1,
      apellidos: 1,
      carrera: "$carrera.nombre"
    }
  }
])

