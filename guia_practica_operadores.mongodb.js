use("gestion_academica")

// ====================================================================================
// 1. Obtenga el total de calificaciones registradas por cada estudiante.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      total_calificaciones: { $sum: 1 }
    }
  }
])

// ====================================================================================
// 2. Calcule el promedio de notas por estudiante.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      promedio_notas: { $avg: "$nota" }
    }
  }
])

// ====================================================================================
// 3. Determine la nota más alta obtenida por cada estudiante.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      nota_mas_alta: { $max: "$nota" }
    }
  }
])

// ====================================================================================
// 4. Determine la nota más baja obtenida por cada estudiante.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      nota_mas_baja: { $min: "$nota" }
    }
  }
])

// ====================================================================================
// 5. Liste todas las notas agrupadas por estudiante.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      listado_notas: { $push: "$nota" }
    }
  }
])

// ====================================================================================
// 6. Ordene a los estudiantes según su promedio de notas de mayor a menor.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      promedio_notas: { $avg: "$nota" }
    }
  },
  { $sort: { promedio_notas: -1 } }
])

// ====================================================================================
// 7. Muestre únicamente los 3 estudiantes con mejor promedio.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      promedio_notas: { $avg: "$nota" }
    }
  },
  { $sort: { promedio_notas: -1 } },
  { $limit: 3 }
])

// ====================================================================================
// 8. Obtenga el total de evaluaciones registradas por grupo (codigo_grupo).
// ====================================================================================
db.evaluaciones.aggregate([
  {
    $group: {
      _id: "$codigo_grupo",
      total_evaluaciones: { $sum: 1 }
    }
  }
])

// ====================================================================================
// 9. Calcule el promedio de notas por evaluación (codigo_evaluacion).
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$codigo_evaluacion",
      promedio_evaluacion: { $avg: "$nota" }
    }
  }
])

// ====================================================================================
// 10. Ordene las evaluaciones según el promedio obtenido, de menor a mayor.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$codigo_evaluacion",
      promedio_evaluacion: { $avg: "$nota" }
    }
  },
  { $sort: { promedio_evaluacion: 1 } }
])

// ====================================================================================
// 11. Muestre las 5 calificaciones más altas registradas en toda la base de datos.
// ====================================================================================
db.calificaciones.aggregate([
  { $sort: { nota: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      carnet_estudiante: 1,
      codigo_evaluacion: 1,
      nota: 1
    }
  }
])

// ====================================================================================
// 12. Muestre las 5 calificaciones más bajas.
// ====================================================================================
db.calificaciones.aggregate([
  { $sort: { nota: 1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      carnet_estudiante: 1,
      codigo_evaluacion: 1,
      nota: 1
    }
  }
])

// ====================================================================================
// 13. Determine cuántos estudiantes han sido evaluados por cada evaluación.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$codigo_evaluacion",
      estudiantes_evaluados: { $sum: 1 }
    }
  }
])

// ====================================================================================
// 14. Calcule el promedio general de notas por grupo (utilizando relación entre evaluaciones y calificaciones).
// ====================================================================================
db.calificaciones.aggregate([
  {
    $lookup: {
      from: "evaluaciones",
      localField: "codigo_evaluacion",
      foreignField: "codigo",
      as: "evaluacion"
    }
  },
  { $unwind: "$evaluacion" },
  {
    $group: {
      _id: "$evaluacion.codigo_grupo",
      promedio_general_grupo: { $avg: "$nota" }
    }
  }
])

// ====================================================================================
// 15. Liste los estudiantes con promedio mayor a 9, ordenados de mayor a menor.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      promedio_notas: { $avg: "$nota" }
    }
  },
  {
    $match: {
      promedio_notas: { $gt: 9 }
    }
  },
  { $sort: { promedio_notas: -1 } }
])

// ====================================================================================
// 16. Obtenga los 2 grupos con mayor cantidad de evaluaciones registradas.
// ====================================================================================
db.evaluaciones.aggregate([
  {
    $group: {
      _id: "$codigo_grupo",
      total_evaluaciones: { $sum: 1 }
    }
  },
  { $sort: { total_evaluaciones: -1 } },
  { $limit: 2 }
])

// ====================================================================================
// 17. Calcule el promedio de notas por estudiante y ordénelos de mayor a menor, mostrando solo los 5 mejores.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      promedio_notas: { $avg: "$nota" }
    }
  },
  { $sort: { promedio_notas: -1 } },
  { $limit: 5 }
])

// ====================================================================================
// 18. Obtenga el total de calificaciones por estudiante y muestre únicamente los 3 con más registros.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: "$carnet_estudiante",
      total_calificaciones: { $sum: 1 }
    }
  },
  { $sort: { total_calificaciones: -1 } },
  { $limit: 3 }
])

// ====================================================================================
// 19. Agrupe las calificaciones por fecha de registro (día) y cuente cuántas se registraron por día.
// ====================================================================================
db.calificaciones.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha_registro" } },
      total_registradas: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])