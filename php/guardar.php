<?php
$archivo = '../colegio.xml';
$data = json_decode(file_get_contents('php://input'), true);
$xml = new SimpleXMLElement('<colegio/>');

foreach ($data['alumnos'] as $a) {
  $alumno = $xml->addChild('alumno');
  $alumno->addAttribute('id', $a['id']);
  $alumno->addChild('nombre', $a['nombre']);
  $alumno->addChild('curso', $a['curso']);
  $alumno->addChild('email', $a['email']);
  $alumno->addChild('asignatura', $a['asignatura']);
}

$xml->asXML($archivo);
echo json_encode(['status' => 'ok']);
?>
