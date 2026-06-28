// Seleccionar la base de datos del curso
use("gestion_academica");

// ==========================================
// Ejercicio 1: Mostrar las calificaciones junto con el nombre completo del estudiante.
// ==========================================
db.calificaciones.aggregate([
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
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 2: Mostrar las calificaciones mayores o iguales a 9 junto con el nombre del estudiante.
// ==========================================
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "estudiantes",
      localField: "carnet_estudiante",
      foreignField: "carnet",
      as: "estudiante"
    }
  },
  { $unwind: "$estudiante" },
  { $match: { nota: { $gte: 9 } } },
  {
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 3: Mostrar los grupos junto con el nombre de la materia.
// ==========================================
db.grupos.aggregate([
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
      codigo_grupo: 1,
      nombre_materia: "$materia.nombre",
      turno: 1
    }
  }
]);

// ==========================================
// Ejercicio 4: Mostrar los grupos del turno matutino junto con el nombre de la materia.
// ==========================================
db.grupos.aggregate([
  { $match: { turno: "Matutino" } },
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
      codigo_grupo: 1,
      nombre_materia: "$materia.nombre",
      turno: 1
    }
  }
]);

// ==========================================
// Ejercicio 5: Mostrar los estudiantes junto con el nombre de la carrera.
// ==========================================
db.estudiantes.aggregate([
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
    $project: {
      _id: 0,
      carnet: 1,
      nombres: 1,
      apellidos: 1,
      carrera: "$carrera.nombre"
    }
  }
]);

// ==========================================
// Ejercicio 6: Mostrar los estudiantes del departamento de San Miguel junto con su carrera.
// ==========================================
db.estudiantes.aggregate([
  { $match: { "direccion.departamento": "San Miguel" } },
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
    $project: {
      _id: 0,
      nombres: 1,
      apellidos: 1,
      carrera: "$carrera.nombre",
      departamento: "$direccion.departamento"
    }
  }
]);

// ==========================================
// Ejercicio 7: Mostrar las inscripciones junto con el nombre del estudiante.
// ==========================================
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
    $project: {
      _id: 0,
      id_inscripcion: 1,
      codigo_grupo: 1,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      estado: 1
    }
  }
]);

// ==========================================
// Ejercicio 8: Mostrar únicamente las inscripciones en estado "Inscrito" junto con el nombre del estudiante.
// ==========================================
db.inscripciones.aggregate([
  { $match: { estado: "Inscrito" } },
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
    $project: {
      _id: 0,
      id_inscripcion: 1,
      codigo_grupo: 1,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      estado: 1
    }
  }
]);

// ==========================================
// Ejercicio 9: Mostrar las evaluaciones junto con el código de grupo y aula.
// ==========================================
db.evaluaciones.aggregate([
  {
    $lookup: {
      from: "grupos",
      localField: "grupo_codigo",
      foreignField: "codigo_grupo",
      as: "grupo"
    }
  },
  { $unwind: "$grupo" },
  {
    $project: {
      _id: 0,
      nombre_evaluacion: 1,
      porcentaje: 1,
      codigo_grupo: "$grupo.codigo_grupo",
      aula: "$grupo.aula"
    }
  }
]);

// ==========================================
// Ejercicio 10: Mostrar las materias junto con los grupos asociados.
// ==========================================
db.materias.aggregate([
  {
    $lookup: {
      from: "grupos",
      localField: "codigo",
      foreignField: "materia_codigo",
      as: "grupos_asociados"
    }
  },
  {
    $project: {
      _id: 0,
      codigo: 1,
      nombre_materia: "$nombre",
      grupos: "$grupos_asociados.codigo_grupo"
    }
  }
]);

// ==========================================
// Ejercicio 11: Mostrar las calificaciones junto con el nombre de la evaluación.
// ==========================================
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "evaluaciones",
      localField: "evaluacion_id",
      foreignField: "id_evaluacion",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  {
    $project: {
      _id: 0,
      carnet_estudiante: 1,
      evaluacion: "$evaluacion.nombre_evaluacion",
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 12: Mostrar las calificaciones de los estudiantes cuya nota sea mayor a 8, incluyendo nombre del estudiante.
// ==========================================
db.calificaciones.aggregate([
  { $match: { nota: { $gt: 8 } } },
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
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 13: Mostrar las evaluaciones cuyo porcentaje sea mayor o igual a 30 junto con el aula del grupo.
// ==========================================
db.evaluaciones.aggregate([
  { $match: { porcentaje: { $gte: 30 } } },
  {
    $lookup: {
      from: "grupos",
      localField: "grupo_codigo",
      foreignField: "codigo_grupo",
      as: "grupo"
    }
  },
  { $unwind: "$grupo" },
  {
    $project: {
      _id: 0,
      nombre_evaluacion: 1,
      porcentaje: 1,
      aula: "$grupo.aula",
      codigo_grupo: "$grupo.codigo_grupo"
    }
  }
]);

// ==========================================
// Ejercicio 14: Mostrar los grupos junto con el nombre del docente.
// ==========================================
db.grupos.aggregate([
  {
    $lookup: {
      from: "docentes",
      localField: "docente_carnet",
      foreignField: "carnet",
      as: "docente"
    }
  },
  { $unwind: "$docente" },
  {
    $project: {
      _id: 0,
      codigo_grupo: 1,
      docente: { $concat: ["$docente.nombres", " ", "$docente.apellidos"] }
    }
  }
]);

// ==========================================
// Ejercicio 15: Mostrar los grupos activos junto con el nombre del docente y su especialidad.
// ==========================================
db.grupos.aggregate([
  { $match: { estado: "Activo" } },
  {
    $lookup: {
      from: "docentes",
      localField: "docente_carnet",
      foreignField: "carnet",
      as: "docente"
    }
  },
  { $unwind: "$docente" },
  {
    $project: {
      _id: 0,
      codigo_grupo: 1,
      docente: { $concat: ["$docente.nombres", " ", "$docente.apellidos"] },
      especialidad: "$docente.especialidad"
    }
  }
]);

// ==========================================
// Ejercicio 16: Mostrar los estudiantes activos junto con su carrera.
// ==========================================
db.estudiantes.aggregate([
  { $match: { estado: "Activo" } },
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
    $project: {
      _id: 0,
      carnet: 1,
      estudiante: { $concat: ["$nombres", " ", "$apellidos"] },
      carrera: "$carrera.nombre"
    }
  }
]);

// ==========================================
// Ejercicio 17: Mostrar las inscripciones de estudiantes de la carrera TIDS.
// ==========================================
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
  { $match: { "estudiante.carrera_codigo": "TIDS" } },
  {
    $project: {
      _id: 0,
      id_inscripcion: 1,
      carnet_estudiante: 1,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      carrera: "$estudiante.carrera_codigo",
      codigo_grupo: 1
    }
  }
]);

// ==========================================
// Ejercicio 18: Mostrar las materias con más de 4 UV junto con sus grupos.
// ==========================================
db.materias.aggregate([
  { $match: { uv: { $gt: 4 } } },
  {
    $lookup: {
      from: "grupos",
      localField: "codigo",
      foreignField: "materia_codigo",
      as: "grupos"
    }
  },
  {
    $project: {
      _id: 0,
      nombre_materia: "$nombre",
      uv: 1,
      grupos_asociados: "$grupos.codigo_grupo"
    }
  }
]);

// ==========================================
// Ejercicio 19: Mostrar las calificaciones junto con: nombre del estudiante, nombre de la evaluación.
// ==========================================
db.calificaciones.aggregate([
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
      from: "evaluaciones",
      localField: "evaluacion_id",
      foreignField: "id_evaluacion",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  {
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      evaluacion: "$evaluacion.nombre_evaluacion",
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 20: Mostrar las calificaciones del grupo ADS301-G01, incluyendo: estudiante, evaluación, nota.
// ==========================================
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "evaluaciones",
      localField: "evaluacion_id",
      foreignField: "id_evaluacion",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  { $match: { "evaluacion.grupo_codigo": "ADS301-G01" } },
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
    $project: {
      _id: 0,
      grupo: "$evaluacion.grupo_codigo",
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      evaluacion: "$evaluacion.nombre_evaluacion",
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 21: Mostrar las calificaciones entre 8 y 10 junto con estudiante y evaluación.
// ==========================================
db.calificaciones.aggregate([
  { $match: { nota: { $gte: 8, $lte: 10 } } },
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
      from: "evaluaciones",
      localField: "evaluacion_id",
      foreignField: "id_evaluacion",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  {
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      evaluacion: "$evaluacion.nombre_evaluacion",
      nota: 1
    }
  }
]);

// ==========================================
// Ejercicio 22: Mostrar los estudiantes junto con sus inscripciones y el nombre de la materia del grupo.
// ==========================================
db.estudiantes.aggregate([
  {
    $lookup: {
      from: "inscripciones",
      localField: "carnet",
      foreignField: "carnet_estudiante",
      as: "inscripcion"
    }
  },
  { $unwind: "$inscripcion" },
  {
    $lookup: {
      from: "grupos",
      localField: "inscripcion.codigo_grupo",
      foreignField: "codigo_grupo",
      as: "grupo"
    }
  },
  { $unwind: "$grupo" },
  {
    $lookup: {
      from: "materias",
      localField: "grupo.materia_codigo",
      foreignField: "codigo",
      as: "materia"
    }
  },
  { $unwind: "$materia" },
  {
    $project: {
      _id: 0,
      estudiante: { $concat: ["$nombres", " ", "$apellidos"] },
      grupo: "$grupo.codigo_grupo",
      materia: "$materia.nombre"
    }
  }
]);

// ==========================================
// Ejercicio 23: Mostrar los grupos junto con materia docente. Filtrar solo los del turno vespertino.
// ==========================================
db.grupos.aggregate([
  { $match: { turno: "Vespertino" } },
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
    $lookup: {
      from: "docentes",
      localField: "docente_carnet",
      foreignField: "carnet",
      as: "docente"
    }
  },
  { $unwind: "$docente" },
  {
    $project: {
      _id: 0,
      codigo_grupo: 1,
      turno: 1,
      materia: "$materia.nombre",
      docente: { $concat: ["$docente.nombres", " ", "$docente.apellidos"] }
    }
  }
]);

// ==========================================
// Ejercicio 24: Mostrar las evaluaciones junto con: grupo, materia. Filtrar evaluaciones con porcentaje mayor a 25.
// ==========================================
db.evaluaciones.aggregate([
  { $match: { porcentaje: { $gt: 25 } } },
  {
    $lookup: {
      from: "grupos",
      localField: "grupo_codigo",
      foreignField: "codigo_grupo",
      as: "grupo"
    }
  },
  { $unwind: "$grupo" },
  {
    $lookup: {
      from: "materias",
      localField: "grupo.materia_codigo",
      foreignField: "codigo",
      as: "materia"
    }
  },
  { $unwind: "$materia" },
  {
    $project: {
      _id: 0,
      nombre_evaluacion: 1,
      porcentaje: 1,
      grupo: "$grupo.codigo_grupo",
      materia: "$materia.nombre"
    }
  }
]);

// ==========================================
// Ejercicio 25: Mostrar las calificaciones junto con: estudiante, evaluación, grupo. Filtrar solo notas mayores o iguales a 9.
// ==========================================
db.calificaciones.aggregate([
  { $match: { nota: { $gte: 9 } } },
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
      from: "evaluaciones",
      localField: "evaluacion_id",
      foreignField: "id_evaluacion",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  {
    $project: {
      _id: 0,
      estudiante: { $concat: ["$estudiante.nombres", " ", "$estudiante.apellidos"] },
      evaluacion: "$evaluacion.nombre_evaluacion",
      grupo: "$evaluacion.grupo_codigo",
      nota: 1
    }
  }
]);

