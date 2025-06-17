<?php
$archivo = '../colegio.xml';
$xml = simplexml_load_file($archivo);
header('Content-Type: application/json');

$result = ['alumnos' => []];
foreach ($xml->alumno as $a) {
  $result['alumnos'][] = [
    'id' => (string)$a['id'],
    'nombre' => (string)$a->nombre,
    'curso' => (string)$a->curso,
    'email' => (string)$a->email,
    'asignatura' => (string)$a->asignatura
  ];
}
echo json_encode($result);
?>
