use("gestion_academica")

// EJEMPLO 01: 
// Elabore una consulta de agregación que muestre los 5 estudiantes 
// con mejor promedio de calificaciones, incluyendo el carnet, nombre completo 
// del estudiante, carrera, total de calificaciones registradas, promedio, 
// nota mínima, nota máxima y listado de notas.

db.calificaciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "carnet_estudiante",
      foreignField: "carnet",
      as: "estudiante"
    }
  },
  { $unwind: "$student" },
  {
    $lookup: {
      from: "carreras",
      localField: "estudiante.carrera_codigo",
      foreignField: "codigo",
      as: "carrera"
    }
  },
  { $unwind: "$carrera" },
  {
    $group: {
      _id: "$carnet_estudiante",
      nombre_estudiante: {
        $first: {
          $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"]
        }
      },
      carrera: { $first: "$carrera.nombre" },
      total_calificaciones: { $sum: 1 },
      promedio_calificaciones: { $avg: "$nota" },
      nota_minima: { $min: "$nota" },
      nota_maxima: { $max: "$nota" },
      listado_notas: { $push: "$nota" }
    }
  },
  { $sort: { promedio_calificaciones: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      carnet: "$_id",
      nombre_estudiante: 1,
      carrera: 1,
      total_calificaciones: 1,
      promedio_calificaciones: 1,
      nota_minima: 1,
      nota_maxima: 1,
      listado_notas: 1
    }
  }
])


// EJEMPLO 02: 
// Elabore una consulta de agregación que muestre la cantidad de estudiantes 
// activos por carrera, incluyendo el código de la carrera, nombre de la carrera, 
// modalidad, total de estudiantes activos y el listado de estudiantes con su carnet y nombre completo.

db.estudiantes.aggregate([
  {
    $match: {
      activo: true
    }
  },
  {
    $lookup: {
      from: "carreras",
      localField: "carrera_codigo",
      foreignField: "codigo",
      as: "carrera"
    }
  },
  { $unwind: "$carrera" },
  {
    $group: {
      _id: "$carrera_codigo",
      carrera: { $first: "$carrera.nombre" },
      modalidad: { $first: "$carrera.modalidad" },
      total_estudiantes: { $sum: 1 },
      estudiantes: {
        $push: {
          carnet: "$carnet",
          nombre: {
            $concat: ["$nombres", " ", "$apellidos"]
          }
        }
      }
    }
  },
  { $sort: { total_estudiantes: -1 } },
  {
    $project: {
      _id: 0,
      codigo_carrera: "$_id",
      carrera: 1,
      modalidad: 1,
      total_estudiantes: 1,
      estudiantes: 1
    }
  }
])


// EJEMPLO 03: 
// Elabore una consulta de agregación que muestre los 3 grupos del turno matutino asociados 
// a las materias con mayor cantidad de unidades valorativas, incluyendo código del grupo, 
// turno, ciclo, código de materia, nombre de materia, área y unidades valorativas.


db.grupos.aggregate([
  {
    $match: {
      turno: "Matutino"
    }
  },
  {
    $lookup: {
      from: "materias",
      localField: "materia_codigo",
      foreignField: "codigo",
      as: "materia"
    }
  },
  { $unwind: "$materia" },
  {
    $project: {
      _id: 0,
      codigo_grupo: "$codigo",
      turno: 1,
      ciclo: 1,
      codigo_materia: "$materia.codigo",
      materia: "$materia.nombre",
      area: "$materia.area",
      uv: "$materia.uv"
    }
  },
  { $sort: { uv: -1 } },
  { $limit: 3 }
])

// EJEMPLO 04: Elabore una consulta de agregación que muestre las inscripciones de estudiantes 
// en grupos del turno matutino, incluyendo carnet del estudiante, nombre completo, código del grupo,
//  turno, estado de inscripción y fecha de inscripción. Los resultados deben ordenarse alfabéticamente 
// por estudiante y limitarse a 10 registros.


db.inscripciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "carnet_estudiante",
      foreignField: "carnet",
      as: "estudiante"
    }
  },
  { $unwind: "$estudiante" },
  {
    $lookup: {
      from: "grupos",
      localField: "grupo_codigo",
      foreignField: "codigo",
      as: "grupo"
    }
  },
  { $unwind: "$grupo" },
  {
    $match: {
      "grupo.turno": "Matutino"
    }
  },
  {
    $project: {
      _id: 0,
      carnet: "$estudiante.carnet",
      estudiante: {
        $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"]
      },
      grupo: "$grupo.codigo",
      turno: "$grupo.turno",
      estado_inscripcion: "$estado",
      fecha_inscripcion: 1
    }
  },
  { $sort: { estudiante: 1 } },
  { $limit: 10 }
])