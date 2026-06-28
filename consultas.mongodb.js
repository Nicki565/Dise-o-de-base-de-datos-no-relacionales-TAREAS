//Seleccionar la Base de Datos
use ('gestion_academica');

//1. Realice una consulta que muestre todos los documentos de la colección estudiantes.
db.estudiantes.find();

//2. Muestre únicamente los campos carnet, nombres y apellidos de todos los estudiantes, excluyendo el campo _id.
db.estudiantes.find({}, {carnet: 1,nombres: 1,apellidos: 1,_id: 0});

//3. Consulte a los estudiantes cuyo campo activo sea true.
db.estudiantes.find({
    activo: { $eq: true }
});

//4. Muestre los estudiantes que pertenezcan a la carrera con código "TIDS".
db.estudiantes.find({carrera_codigo: "TIDS" });

//5. Consulte las materias cuyo campo de área sea "Tecnología".
db.materias.find({area: "Tecnología" });

//6. Muestre las carreras cuya modalidad sea "Presencial".
db.carreras.find({modalidad: "Presencial"});

//7. Consulte los grupos cuyo turno sea "matutino".
db.grupos.find({turno: "matutino"});

//8. Muestre las evaluaciones cuyo porcentaje sea exactamente igual a 30.
db.evaluaciones.find({ porcentaje: 30 });

//9. Consulte los estudiantes cuyo departamento sea "San Miguel", utilizando el campo anidado direccion.departamento.
db.estudiantes.find({"direccion.departamento": "San Miguel"});

//10. Muestre los estudiantes cuyo municipio sea "La Unión".
db.estudiantes.find({"direccion.municipio": "La Unión"});

//11. Consulte a los estudiantes que sean activos y pertenezcan a la carrera "TIDS".
db.estudiantes.find({
    $and: [
        { activo: true },
        { carrera_codigo: "TIDS" }
    ]
});

//12. Muestre los estudiantes que pertenezcan a la carrera "TIDS" o "TRI".
db.estudiantes.find({
    $or: [
        { carrera_codigo: "TIDS" },
        { carrera_codigo: "TRI" }
    ]
});

//13. Consulte las materias cuyo valor de UV sea mayor que 4.
db.materias.find({
    uv: { $gt: 4 }
});

//14. Muestre las materias cuyo valor de uv sea menor o igual a 5.
db.materias.find({
    uv: { $lte: 5 }
});

//15. Consulte las carreras cuya duración en años (duracion_anios) sea mayor o igual a 4.
db.carreras.find({
    duracion_anios: { $gte: 4 }
});

//16. Muestre las evaluaciones cuyo porcentaje sea menor que 25.
db.evaluaciones.find({
    porcentaje: { $lt: 25 }
});

//17. Consulte las calificaciones cuya nota sea mayor a 8.0.
db.calificaciones.find({
    nota: { $gt: 8.0 }
});

//18. Muestre los estudiantes que sean activos y que además vivan en el departamento "San Miguel".
db.estudiantes.find({
    $and: [
        { activo: true },
        { "direccion.departamento": "San Miguel" }
    ]
});

//19. Consulte a los estudiantes que vivan en "San Miguel" o "La Unión".
db.estudiantes.find({
    $or: [
        { "direccion.departamento": "San Miguel" },
        { "direccion.departamento": "La Unión" }
    ]
});

//20. Muestre los estudiantes que no pertenezcan a la carrera "TIDS".
db.estudiantes.find({
    carrera_codigo: { $ne: "TIDS" }
});

//21. Consulte las materias cuyo valor de UV no sea mayor que 4, utilizando el operador $not.
db.materias.find({
    uv: { $not: { $gt: 4 } }
});

//22. Muestre las evaluaciones cuyo porcentaje esté entre 20 y 40.
db.evaluaciones.find({
   porcentaje: { $gte: 20, $lte: 40 } 
});

//23. Consulte las calificaciones cuya nota esté entre 7.0 y 9.0.
db.calificaciones.find({
    nota: { $gte: 7.0, $lte: 9.0}
});

//24. Muestre los grupos cuyo cupo máximo sea mayor a 25 y cuyo turno sea "Matutino".
db.grupos.find({
    cupo_maximo: { $gt: 25 }, turno: "Matutino"
});

//25. Consulte los grupos cuyo turno sea "Matutino" o "Vespertino", pero cuyo cupo máximo no sea mayor a 30.
db.grupos.find({
    $or: [
        { "turno": "Matutino" },
        { "turno": "Vespertino" }
    ],
    cupo_maximo: { $not: { $gt: 30 } }
});

//26. Desarrolle una consulta que recupere los estudiantes activos que pertenezcan a las carreras TIDS o IDS, que hayan nacido después del 1 de enero de 2004 y que además no sean de género Masculini.
db.estudiantes.find({
    activo: true,
    carrera_codigo: { $in: ["TIDS", "IDS"] },
    fecha_nacimiento: { $gt: ISODate("2004-01-01T00:00:00Z") },
    genero: { $ne: "Masculino" }
});
