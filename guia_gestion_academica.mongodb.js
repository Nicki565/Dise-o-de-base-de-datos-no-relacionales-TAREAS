// ==========================================
// EJERCICIO GUIADO (13 CAPTURAS)
// ==========================================

// 1. Selección de base de datos
db = db.getSiblingDB("gestion_academica");

// 2. Creación de colecciones
db.createCollection("carreras")
db.createCollection("docentes")
db.createCollection("estudiantes")
db.createCollection("materias")
db.createCollection("grupos")
db.createCollection("inscripciones")
db.createCollection("evaluaciones")

// 3. Inserción en carreras
db.carreras.insertMany([
  {
    nombre: "Técnico en Ingeniería de Desarrollo de Software",
    codigo: "TIDS",
    duracion_anios: 2,
    modalidad: "Presencial",
    activo: true
  },
  {
    nombre: "Ingeniería en Desarrollo de Software",
    codigo: "IDS",
    duracion_anios: 4,
    modalidad: "Semipresencial",
    activo: true
  }
])

// 4. Inserción en docentes
db.docentes.insertMany([
  {
    nombres: "Carlos Alberto",
    apellidos: "Ramírez López",
    dui: "12345678-9",
    email: "carlos.ramirez@institucion.edu.sv",
    telefono: "7123-4567",
    especialidad: "Bases de Datos",
    fecha_contratacion: new Date("2023-01-15"),
    activo: true
  },
  {
    nombres: "Ana Lucía",
    apellidos: "Martínez Gómez",
    dui: "98765432-1",
    email: "ana.martinez@institucion.edu.sv",
    telefono: "7234-5678",
    especialidad: "Programación Web",
    fecha_contratacion: new Date("2022-08-10"),
    activo: true
  }
])

// (Primeros 2 estudiantes de la guía)
db.estudiantes.insertMany([
  {
    carnet: "2026-DS-001",
    nombres: "José Miguel",
    apellidos: "Hernández Pérez",
    fecha_nacimiento: new Date("2005-03-12"),
    genero: "Masculino",
    email: "jose.hernandez@alumno.edu.sv",
    telefono: "7011-2233",
    direccion: {
      departamento: "La Unión",
      municipio: "La Unión",
      detalle: "Colonia El Centro, casa #12"
    },
    carrera_codigo: "TIDS",
    ciclo_ingreso: "I-2026",
    materias_aprobadas: [],
    activo: true
  },
  {
    carnet: "2026-DS-002",
    nombres: "María Fernanda",
    apellidos: "Castro Rivera",
    fecha_nacimiento: new Date("2004-11-08"),
    genero: "Femenino",
    email: "maria.castro@alumno.edu.sv",
    telefono: "7099-8877",
    direccion: {
      departamento: "San Miguel",
      municipio: "San Miguel",
      detalle: "Residencial Las Flores"
    },
    carrera_codigo: "TIDS",
    ciclo_ingreso: "I-2026",
    materias_aprobadas: [],
    activo: true
  }
])

// 5. Inserción en materias
db.materias.insertMany([
  {
    codigo: "MDB101",
    nombre: "Bases de Datos No Relacionales",
    uv: 4,
    ciclo: 1,
    area: "Base de Datos",
    prerrequisitos: [],
    activo: true
  },
  {
    codigo: "PRW201",
    nombre: "Desarrollo de Aplicaciones Web",
    uv: 5,
    ciclo: 2,
    area: "Programación",
    prerrequisitos: ["MDB101"],
    activo: true
  },
  {
    codigo: "ADS301",
    nombre: "Análisis y Diseño de Sistemas",
    uv: 4,
    ciclo: 2,
    area: "Ingeniería de Software",
    prerrequisitos: [],
    activo: true
  }
])

// 6. Inserción en grupos
db.grupos.insertMany([
  {
    codigo_grupo: "MDB101-G01",
    materia_codigo: "MDB101",
    docente_email: "carlos.ramirez@institucion.edu.sv",
    ciclo: "I-2026",
    turno: "Matutino",
    aula: "Lab-01",
    cupo_maximo: 30,
    horario: [
      { dia: "Lunes", hora_inicio: "08:00", hora_fin: "09:40" },
      { dia: "Miércoles", hora_inicio: "08:00", hora_fin: "09:40" }
    ],
    activo: true
  },
  {
    codigo_grupo: "PRW201-G01",
    materia_codigo: "PRW201",
    docente_email: "ana.martinez@institucion.edu.sv",
    ciclo: "I-2026",
    turno: "Vespertino",
    aula: "Lab-02",
    cupo_maximo: 25,
    horario: [
      { dia: "Martes", hora_inicio: "01:00", hora_fin: "03:00" },
      { dia: "Jueves", hora_inicio: "01:00", hora_fin: "03:00" }
    ],
    activo: true
  }
])

// 7. Inserción en inscripciones
db.inscripciones.insertMany([
  {
    carnet_estudiante: "2026-DS-001",
    codigo_grupo: "MDB101-G01",
    fecha_inscripcion: new Date("2026-01-20"),
    estado: "Inscrito"
  },
  {
    carnet_estudiante: "2026-DS-002",
    codigo_grupo: "MDB101-G01",
    fecha_inscripcion: new Date("2026-01-21"),
    estado: "Inscrito"
  }
])

// 8. Inserción inicial en evaluaciones
db.evaluaciones.insertMany([
  {
    codigo_grupo: "MDB101-G01",
    nombre_evaluacion: "Primer Parcial",
    porcentaje: 30,
    fecha: new Date("2026-02-20"),
    calificaciones: [
      { carnet_estudiante: "2026-DS-001", nota: 8.5, observacion: "Buen desempeño" },
      { carnet_estudiante: "2026-DS-002", nota: 7.8, observacion: "Debe reforzar consultas" }
    ]
  },
  {
    codigo_grupo: "MDB101-G01",
    nombre_evaluacion: "Proyecto Práctico",
    porcentaje: 40,
    fecha: new Date("2026-03-15"),
    calificaciones: [
      { carnet_estudiante: "2026-DS-001", nota: 9.0, observacion: "Excelente estructura del modelo" },
      { carnet_estudiante: "2026-DS-002", nota: 8.2, observacion: "Buen trabajo" }
    ]
  }
])

// 9. Creación de la colección calificaciones
db.createCollection("calificaciones")

// 10. Actualización de códigos en evaluaciones
db.evaluaciones.updateOne(
  { codigo_grupo: "MDB101-G01", nombre_evaluacion: "Primer Parcial" },
  { $set: { codigo_evaluacion: "EV-MDB101-001", activo: true } }
)

db.evaluaciones.updateOne(
  { codigo_grupo: "MDB101-G01", nombre_evaluacion: "Proyecto Práctico" },
  { $set: { codigo_evaluacion: "EV-MDB101-002", activo: true } }
)

// 11. Inserción de los registros individuales en la colección calificaciones
db.calificaciones.insertMany([
  {
    codigo_evaluacion: "EV-MDB101-001",
    carnet_estudiante: "2026-DS-001",
    nota: 8.5,
    observacion: "Buen desempeño",
    fecha_registro: new Date("2026-02-20")
  },
  {
    codigo_evaluacion: "EV-MDB101-001",
    carnet_estudiante: "2026-DS-002",
    nota: 7.8,
    observacion: "Debe reforzar consultas",
    fecha_registro: new Date("2026-02-20")
  },
  {
    codigo_evaluacion: "EV-MDB101-002",
    carnet_estudiante: "2026-DS-001",
    nota: 9.0,
    observacion: "Excelente estructura del modelo",
    fecha_registro: new Date("2026-03-15")
  },
  {
    codigo_evaluacion: "EV-MDB101-002",
    carnet_estudiante: "2026-DS-002",
    nota: 8.2,
    observacion: "Buen trabajo",
    fecha_registro: new Date("2026-03-15")
  }
])

// 12. Eliminación del campo calificaciones antiguo de la colección evaluaciones
db.evaluaciones.updateMany(
  {},
  { $unset: { calificaciones: "" } }
)


// ==========================================
// ACTIVIDAD COMPLEMENTARIA
// ==========================================

// 1. Inserción de las 3 carreras adicionales solicitadas
db.carreras.insertMany([
  { nombre: "Técnico en Gastronomía", codigo: "TGAS", duracion_anios: 2, modalidad: "Presencial", activo: true },
  { nombre: "Ingeniería en Logística y Aduanas", codigo: "ILA", duracion_anios: 5, modalidad: "Semipresencial", activo: true },
  { nombre: "Técnico en Turismo", codigo: "TTUR", duracion_anios: 2, modalidad: "Presencial", activo: true }
]);

// 2. Inserción de materias adicionales para las nuevas carreras
db.materias.insertMany([
  { codigo: "FC101", nombre: "Fundamentos de Cocina", uv: 4, ciclo: 1, area: "Gastronomía", prerequisitos: [], activo: true },
  { codigo: "CI201", nombre: "Cocina Internacional", uv: 5, ciclo: 2, area: "Gastronomía", prerequisitos: ["FC101"], activo: true },
  { codigo: "IL101", nombre: "Introducción a la Logística", uv: 4, ciclo: 1, area: "Logística", prerequisitos: [], activo: true },
  { codigo: "GA201", nombre: "Gestión Aduanera", uv: 5, ciclo: 2, area: "Aduanas", prerequisitos: ["IL101"], activo: true },
  { codigo: "IT101", nombre: "Introducción al Turismo", uv: 4, ciclo: 1, area: "Turismo", prerequisitos: [], activo: true },
  { codigo: "GST201", nombre: "Gestión de Servicios Turísticos", uv: 5, ciclo: 2, area: "Turismo", prerequisitos: ["IT101"], activo: true }
]);

// 3. Inserción de docentes adicionales encargados de estas áreas
db.docentes.insertMany([
  { nombres: "Luis Fernando", apellidos: "Méndez Castillo", dui: "11223344-5", email: "luis.mendez@institucion.edu.sv", telefono: "7001-2233", especialidad: "Gastronomía", fecha_contratacion: new Date("2023-02-10"), activo: true },
  { nombres: "Patricia Elena", apellidos: "López Herrera", dui: "22334455-6", email: "patricia.lopez@institucion.edu.sv", telefono: "7112-3344", especialidad: "Turismo", fecha_contratacion: new Date("2022-09-15"), activo: true },
  { nombres: "Jorge Armando", apellidos: "Pérez Gómez", dui: "33445566-7", email: "jorge.perez@institucion.edu.sv", telefono: "7223-4455", especialidad: "Logística", fecha_contratacion: new Date("2021-06-20"), activo: true },
  { nombres: "Karla Sofía", apellidos: "Rivera Martínez", dui: "44556677-8", email: "karla.rivera@institucion.edu.sv", telefono: "7334-5566", especialidad: "Aduanas", fecha_contratacion: new Date("2024-01-05"), activo: true },
  { nombres: "Mario Andrés", apellidos: "Castillo Vega", dui: "55667788-9", email: "mario.castillo@institucion.edu.sv", telefono: "7445-6677", especialidad: "Gestión Empresarial", fecha_contratacion: new Date("2020-03-12"), activo: true }
]);

// 4. INSERCIÓN COMPLEMENTARIA DE ESTUDIANTES
// (Organizados con 5 alumnos por carrera. Los TIDS inician desde el 003 para evitar duplicados)
db.estudiantes.insertMany([
  // TÉCNICO EN INGENIERÍA DE DESARROLLO DE SOFTWARE (TIDS) - 5 Alumnos (Del 003 al 007)
  { carnet: "2026-DS-003", nombres: "Carlos Alfredo", apellidos: "Mendoza Cruz", fecha_nacimiento: new Date("2005-11-05"), genero: "Masculino", email: "carlos.mendoza@alumno.edu.sv", telefono: "7133-4455", direccion: { departamento: "Usulután", municipio: "Usulután", detalle: "Residencial Los Arcos, Calle #2" }, carrera_codigo: "TIDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-DS-004", nombres: "Ana Beatriz", apellidos: "Rivas Quintanilla", fecha_nacimiento: new Date("2006-01-18"), genero: "Femenino", email: "ana.rivas@alumno.edu.sv", telefono: "7844-5566", direccion: { departamento: "La Unión", municipio: "Conchagua", detalle: "Caserío El Faro, Calle Principal" }, carrera_codigo: "TIDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-DS-005", nombres: "Luis Alonso", apellidos: "Martínez Orellana", fecha_nacimiento: new Date("2005-05-30"), genero: "Masculino", email: "luis.martinez@alumno.edu.sv", telefono: "7255-6677", direccion: { departamento: "San Miguel", municipio: "Chinameca", detalle: "Barrio San Juan, casa #45" }, carrera_codigo: "TIDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-DS-006", nombres: "Néstor Alejandro", apellidos: "Guzmán Amaya", fecha_nacimiento: new Date("2005-09-14"), genero: "Masculino", email: "nestor.guzman@alumno.edu.sv", telefono: "7411-8899", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Colonia El Sitio, Pasaje 3, casa #15" }, carrera_codigo: "TIDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-DS-007", nombres: "Diana Marcela", apellidos: "Quinteros Ortiz", fecha_nacimiento: new Date("2006-02-28"), genero: "Femenino", email: "diana.quinteros@alumno.edu.sv", telefono: "7922-0044", direccion: { departamento: "La Unión", municipio: "Conchagua", detalle: "Barrio El Centro, frente al parque" }, carrera_codigo: "TIDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },

  // INGENIERÍA EN DESARROLLO DE SOFTWARE (IDS) - 5 Alumnos (Del 1 al 5)
  { carnet: "2026-IS-001", nombres: "Kevin Josué", apellidos: "Alvarado Benítez", fecha_nacimiento: new Date("2004-09-14"), genero: "Masculino", email: "kevin.alvarado@alumno.edu.sv", telefono: "7966-7788", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Colonia Milagro de la Paz" }, carrera_codigo: "IDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-IS-002", nombres: "Gabriela Michelle", apellidos: "Fuentes Segovia", fecha_nacimiento: new Date("2005-02-27"), genero: "Femenino", email: "gabriela.fuentes@alumno.edu.sv", telefono: "7377-8899", direccion: { departamento: "La Unión", municipio: "Santa Rosa de Lima", detalle: "Barrio El Centro, casa #8" }, carrera_codigo: "IDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-IS-003", nombres: "David Edgardo", apellidos: "Romero Portillo", fecha_nacimiento: new Date("2004-12-01"), genero: "Masculino", email: "david.romero@alumno.edu.sv", telefono: "7488-9900", direccion: { departamento: "Morazán", municipio: "San Francisco Gotera", detalle: "Colonia Vista Hermosa" }, carrera_codigo: "IDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-IS-004", nombres: "Valeria Alexandra", apellidos: "Mejía Claros", fecha_nacimiento: new Date("2005-08-10"), genero: "Femenino", email: "valeria.mejia@alumno.edu.sv", telefono: "7699-0011", direccion: { departamento: "Usulután", municipio: "Santiago de María", detalle: "Final 4a Calle Poniente" }, carrera_codigo: "IDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-IS-005", nombres: "Diego Alejandro", apellidos: "Vásquez Melgar", fecha_nacimiento: new Date("2005-04-25"), genero: "Masculino", email: "diego.vasquez@alumno.edu.sv", telefono: "7011-3344", direccion: { departamento: "San Miguel", municipio: "El Tránsito", detalle: "Barrio Las Delicias" }, carrera_codigo: "IDS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },

  // TÉCNICO EN GASTRONOMÍA (TGAS) - 5 Alumnos (Del 1 al 5)
  { carnet: "2026-TG-001", nombres: "Camila Belén", apellidos: "Villalobos Díaz", fecha_nacimiento: new Date("2006-02-14"), genero: "Femenino", email: "camila.villalobos@alumno.edu.sv", telefono: "7522-4455", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Colonia Ciudad Jardín, Calle C" }, carrera_codigo: "TGAS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TG-002", nombres: "Fernando José", apellidos: "Arias Guillén", fecha_nacimiento: new Date("2005-10-09"), genero: "Masculino", email: "fernando.arias@alumno.edu.sv", telefono: "7133-5566", direccion: { departamento: "La Unión", municipio: "La Unión", detalle: "Colonia San Carlos" }, carrera_codigo: "TGAS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TG-003", nombres: "Sofía Abigail", apellidos: "Campos Machado", fecha_nacimiento: new Date("2006-05-03"), genero: "Femenino", email: "sofia.campos@alumno.edu.sv", telefono: "7844-6677", direccion: { departamento: "Usulután", municipio: "Jiquilisco", detalle: "Puerto El Triunfo, casa #3" }, carrera_codigo: "TGAS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TG-004", nombres: "Christian Omar", apellidos: "López Argueta", fecha_nacimiento: new Date("2005-06-15"), genero: "Masculino", email: "christian.lopez@alumno.edu.sv", telefono: "7255-7788", direccion: { departamento: "Morazán", municipio: "Jocoaitique", detalle: "Barrio El Centro" }, carrera_codigo: "TGAS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TG-005", nombres: "Daniela Maria", apellidos: "Cardona Merino", fecha_nacimiento: new Date("2006-03-20"), genero: "Femenino", email: "daniela.cardona@alumno.edu.sv", telefono: "7966-8899", direccion: { departamento: "San Miguel", municipio: "Moncagua", detalle: "Colonia El Tanque" }, carrera_codigo: "TGAS", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },

  // INGENIERÍA EN LOGÍSTICA Y ADUANAS (ILA) - 5 Alumnos (Del 1 al 5)
  { carnet: "2026-LA-001", nombres: "Rodrigo René", apellidos: "Castillo Amaya", fecha_nacimiento: new Date("2004-07-11"), genero: "Masculino", email: "rodrigo.castillo@alumno.edu.sv", telefono: "7377-9900", direccion: { departamento: "La Unión", municipio: "Pasaquina", detalle: "Frontera El Amatillo, Calle Principal" }, carrera_codigo: "ILA", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-LA-002", nombres: "Andrea Montserrat", apellidos: "Pineda Ortiz", fecha_nacimiento: new Date("2005-01-29"), genero: "Femenino", email: "andrea.pineda@alumno.edu.sv", telefono: "7488-0011", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Urbanización La Pradera, Pasaje 4" }, carrera_codigo: "ILA", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-LA-003", nombres: "Jonathan Alexis", apellidos: "Guzmán Serrano", fecha_nacimiento: new Date("2004-10-05"), genero: "Masculino", email: "jonathan.guzman@alumno.edu.sv", telefono: "7699-1122", direccion: { departamento: "La Unión", municipio: "San Alejo", detalle: "Barrio El Cerrito" }, carrera_codigo: "ILA", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-LA-004", nombres: "Natalia Giselle", apellidos: "Escobar Solórzano", fecha_nacimiento: new Date("2005-09-17"), genero: "Femenino", email: "natalia.escobar@alumno.edu.sv", telefono: "7011-4455", direccion: { departamento: "Usulután", municipio: "Santa Elena", detalle: "Barrio Parroquia" }, carrera_codigo: "ILA", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-LA-005", nombres: "Manuel Eduardo", apellidos: "Henríquez Lara", fecha_nacimiento: new Date("2004-05-24"), genero: "Masculino", email: "manuel.henriquez@alumno.edu.sv", telefono: "7522-5566", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Colonia El Sitio, Etapa 2" }, carrera_codigo: "ILA", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },

  // TÉCNICO EN TURISMO (TTUR) - 5 Alumnos (Del 1 al 5)
  { carnet: "2026-TT-001", nombres: "Adriana Paola", apellidos: "Montalvo Cáceres", fecha_nacimiento: new Date("2006-04-02"), genero: "Femenino", email: "adriana.montalvo@alumno.edu.sv", telefono: "7133-6677", direccion: { departamento: "La Unión", municipio: "Conchagua", detalle: "Playa Las Tunas, Sector Hoteles" }, carrera_codigo: "TTUR", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TT-002", nombres: "Gerardo Antonio", apellidos: "Torres Palacios", fecha_nacimiento: new Date("2005-12-12"), genero: "Masculino", email: "genero.torres@alumno.edu.sv", telefono: "7844-7788", direccion: { departamento: "San Miguel", municipio: "San Miguel", detalle: "Colonia Kury, Pasaje Los Almendros" }, carrera_codigo: "TTUR", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TT-003", nombres: "Elena Beatriz", apellidos: "Guevara Maravilla", fecha_nacimiento: new Date("2006-01-20"), genero: "Femenino", email: "elena.guevara@alumno.edu.sv", telefono: "7255-8899", direccion: { departamento: "Morazán", municipio: "Perquín", detalle: "Caserío El Bailadero" }, carrera_codigo: "TTUR", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TT-004", nombres: "Juan Carlos", apellidos: "Pinto Quintanilla", fecha_nacimiento: new Date("2005-08-08"), genero: "Masculino", email: "juan.pinto@alumno.edu.sv", telefono: "7966-9900", direccion: { departamento: "Usulután", municipio: "Alegria", detalle: "Barrio El Centro, cerca de la Laguna" }, carrera_codigo: "TTUR", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true },
  { carnet: "2026-TT-005", nombres: "Fatima Vanessa", apellidos: "Paz Coreas", fecha_nacimiento: new Date("2006-06-11"), genero: "Femenino", email: "fatima.paz@alumno.edu.sv", telefono: "7377-0011", direccion: { departamento: "La Unión", municipio: "Meanguera del Golfo", detalle: "Isla Meanguera, Sector El Muelle" }, carrera_codigo: "TTUR", ciclo_ingreso: "I-2026", materias_aprobadas: [], activo: true }
]);